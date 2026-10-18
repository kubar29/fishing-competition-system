const prisma = require('../prisma/client');

const startInclude = {
    competitor: true,
    competitionEntry: true,
    round: true,
    sector: true
};

const findStartOrThrow = async (id) => {
    const start = await prisma.start.findUnique({
        where: { id },
        include: startInclude
    });

    if (!start) {
        const error = new Error('Nie znaleziono startu');
        error.statusCode = 404;
        throw error;
    }

    return start;
};

const findCompetitorOrThrow = async (competitorId) => {
    const competitor = await prisma.competitor.findUnique({
        where: { id: competitorId }
    });

    if (!competitor) {
        const error = new Error('Nie znaleziono zawodnika');
        error.statusCode = 404;
        throw error;
    }

    return competitor;
};

const findRoundOrThrow = async (roundId) => {
    const round = await prisma.round.findUnique({
        where: { id: roundId }
    });

    if (!round) {
        const error = new Error('Nie znaleziono tury');
        error.statusCode = 404;
        throw error;
    }

    return round;
};

const findSectorOrThrow = async (sectorId) => {
    const sector = await prisma.sector.findUnique({
        where: { id: sectorId }
    });

    if (!sector) {
        const error = new Error('Nie znaleziono sektora');
        error.statusCode = 404;
        throw error;
    }

    return sector;
};

const findCompetitionEntryOrThrow = async (competitionEntryId) => {
    const entry = await prisma.competitionEntry.findUnique({
        where: { id: competitionEntryId },
        include: {
            competitor: true,
            competition: true
        }
    });

    if (!entry) {
        const error = new Error('Nie znaleziono zgłoszenia zawodnika do zawodów');
        error.statusCode = 404;
        throw error;
    }

    return entry;
};

const validateEntryBelongsToCompetitor = (entry, competitorId) => {
    if (entry.competitorId !== competitorId) {
        const error = new Error(
            'Zgłoszenie nie należy do wybranego zawodnika'
        );
        error.statusCode = 400;
        throw error;
    }
};

const validateEntryCategoryMatchesSector = (entry, sector) => {
    if (entry.category !== sector.category) {
        const error = new Error(
            'Kategoria zawodnika nie jest zgodna z kategorią sektora'
        );
        error.statusCode = 400;
        throw error;
    }
};

const validateEntryBelongsToCompetition = (entry, competitionId) => {
    if (entry.competitionId !== competitionId) {
        const error = new Error(
            'Zgłoszenie zawodnika nie należy do zawodów tej tury'
        );
        error.statusCode = 400;
        throw error;
    }
};

const validateSectorBelongsToRound = (sector, roundId, message) => {
    if (sector.roundId !== roundId) {
        const error = new Error(message);
        error.statusCode = 400;
        throw error;
    }
};

const validateRoundBelongsToCompetition = (round, competitionId) => {
    if (round.competitionId !== competitionId) {
        const error = new Error('Tura nie należy do wybranych zawodów');
        error.statusCode = 400;
        throw error;
    }
};

const validateJudgeAccessToSector = async (userId, sectorId) => {
    const sectorJudge = await prisma.sectorJudge.findUnique({
        where: {
            sectorId_userId: {
                sectorId,
                userId
            }
        }
    });

    if (!sectorJudge) {
        const error = new Error('Nie masz uprawnień do obsługi tego sektora');
        error.statusCode = 403;
        throw error;
    }
};

const updateSectorStatusIfReady = async (sectorId) => {
    const starts = await prisma.start.findMany({
        where: { sectorId },
        select: {
            status: true
        }
    });

    const isReady = 
        starts.length > 0 && 
        starts.every((start) => ['WEIGHED', 'DNS', 'DSQ'].includes(start.status));
    
    if(isReady) {
        await prisma.sector.update({
            where: {id: sectorId },
            data: {
                status: 'READY_FOR_RESULTS'
            }
        });
    }
};

exports.getAllStarts = async () => {
    return await prisma.start.findMany({
        include: startInclude
    });
};

exports.getStartById = async (id) => {
    return await findStartOrThrow(id);
};

exports.createStart = async (data) => {
    await findCompetitorOrThrow(data.competitorId);

    const entry = await findCompetitionEntryOrThrow(
        data.competitionEntryId
    );

    const round = await findRoundOrThrow(data.roundId);
    const sector = await findSectorOrThrow(data.sectorId);

    validateEntryBelongsToCompetitor(
        entry,
        data.competitorId
    );

    validateEntryBelongsToCompetition(
        entry,
        round.competitionId
    );

    validateSectorBelongsToRound(
        sector,
        data.roundId,
        'Sektor nie należy do wybranej tury'
    );

    validateEntryCategoryMatchesSector(
        entry,
        sector
    );

    return await prisma.start.create({
        data,
        include: startInclude
    });
};

exports.updateStart = async (id, data) => {
    const existingStart = await findStartOrThrow(id);

    if (data.sectorId !== undefined) {
        const sector = await findSectorOrThrow(data.sectorId);

        validateSectorBelongsToRound(
            sector,
            existingStart.roundId,
            'Sektor nie należy do tury tego startu'
        );

        validateEntryCategoryMatchesSector(
            existingStart.competitionEntry,
            sector
        );
    }

    return await prisma.start.update({
        where: { id },
        data,
        include: startInclude
    });
};

exports.deleteStart = async (id) => {
    await findStartOrThrow(id);

    await prisma.start.delete({
        where: { id }
    });

    return {
        message: 'Usunięto start'
    };
};

exports.getStartsByCompetitionRoundAndSector = async (
    competitionId,
    roundId,
    sectorId
) => {
    const round = await findRoundOrThrow(roundId);

    validateRoundBelongsToCompetition(round, competitionId);

    const sector = await findSectorOrThrow(sectorId);

    validateSectorBelongsToRound(
        sector,
        roundId,
        'Sektor nie należy do wybranej tury'
    );

    return await prisma.start.findMany({
        where: {
            roundId,
            sectorId
        },
        include: startInclude,
        orderBy: {
            pegNumber: 'asc'
        }
    });
};

exports.weighStart = async (id, data, user) => {
    const start = await findStartOrThrow(id);

    if (start.sector.status === 'FINISHED') {
        const error = new Error(
            'Sektor został zakończony. Nie można edytować wyników ważenia.'
        );
        error.statusCode = 409;
        throw error;
    }

    if (user.role === 'JUDGE') {
        await validateJudgeAccessToSector(
            user.userId,
            start.sectorId
        );
    }

    const updatedStart = await prisma.start.update({
        where: { id },
        data: {
            weight: data.weight,
            penaltyPoints: data.penaltyPoints,
            status: 'WEIGHED'
        },
        include: startInclude
    });

    await updateSectorStatusIfReady(start.sectorId);

    return updatedStart;
};