const prisma = require('../prisma/client');

const startInclude = {
    competitor: true,
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
    await findRoundOrThrow(data.roundId);

    const sector = await findSectorOrThrow(data.sectorId);

    validateSectorBelongsToRound(
        sector,
        data.roundId,
        'Sektor nie należy do wybranej tury'
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
            position: 'asc'
        }
    });
};