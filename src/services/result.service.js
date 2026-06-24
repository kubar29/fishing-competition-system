const prisma = require('../prisma/client');

const resultInclude = {
    start: {
        include: {
            competitor: true,
            round: true,
            sector: true
        }
    }
};

const findResultOrThrow = async (id) => {
    const result = await prisma.result.findUnique({
        where: { id },
        include: resultInclude
    });

    if (!result) {
        const error = new Error('Nie znaleziono wyniku');
        error.statusCode = 404;
        throw error;
    }

    return result;
};

const findStartOrThrow = async (startId) => {
    const start = await prisma.start.findUnique({
        where: { id: startId }
    });

    if (!start) {
        const error = new Error('Nie znaleziono startu');
        error.statusCode = 404;
        throw error;
    }

    return start;
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

exports.getAllResults = async () => {
    return await prisma.result.findMany({
        include: resultInclude
    });
};

exports.getResultById = async (id) => {
    return await findResultOrThrow(id);
};

exports.createResult = async (data) => {
    await findStartOrThrow(data.startId);

    try {
        return await prisma.result.create({
            data,
            include: resultInclude
        });
    } catch (error) {
        if (error.code === 'P2002') {
            const conflictError = new Error('Ten start ma już przypisany wynik');
            conflictError.statusCode = 409;
            throw conflictError;
        }

        throw error;
    }
};

exports.updateResult = async (id, data) => {
    await findResultOrThrow(id);

    return await prisma.result.update({
        where: { id },
        data,
        include: resultInclude
    });
};

exports.deleteResult = async (id) => {
    await findResultOrThrow(id);

    await prisma.result.delete({
        where: { id }
    });

    return {
        message: 'Usunięto wynik'
    };
};

exports.getResultsByRoundId = async (roundId) => {
    await findRoundOrThrow(roundId);

    return await prisma.result.findMany({
        where: {
            start: {
                roundId
            }
        },
        include: resultInclude,
        orderBy: [
            {
                sectorPoints: 'asc'
            }
        ]
    });
};
exports.getResultsByCompetitionRoundAndSector = async (
    competitionId,
    roundId,
    sectorId
) => {
    const round = await prisma.round.findFirst({
        where: {
            id: roundId,
            competitionId
        }
    });

    if (!round) {
        const error = new Error('Nie znaleziono tury dla wybranych zawodów');
        error.statusCode = 404;
        throw error;
    }

    const sector = await prisma.sector.findFirst({
        where: {
            id: sectorId,
            roundId
        }
    });

    if (!sector) {
        const error = new Error('Nie znaleziono sektora dla wybranej tury');
        error.statusCode = 404;
        throw error;
    }

    return await prisma.result.findMany({
        where: {
            start: {
                roundId,
                sectorId
            }
        },
        include: {
            start: {
                include: {
                    competitor: true,
                    round: true,
                    sector: true
                }
            }
        },
        orderBy: {
            placeInSector: 'asc'
        }
    });
};