

const prisma = require('../prisma/client');

exports.getAllResults = async () => {
    return await prisma.result.findMany({
        include: {
            start: {
                include: {
                    competitor: true,
                    round: true,
                    sector: true
                }
            }
        }
    });
};

exports.getResultById = async (id) => {
    return await prisma.result.findUnique({
        where: { id },
        include: {
            start: {
                include: {
                    competitor: true,
                    round: true,
                    sector: true
                }
            }
        }
    });
};

exports.createResult = async (data) => {
    const start = await prisma.start.findUnique({
        where: {
            id: data.startId
        }
    });

    if (!start) {
        const error = new Error('Nie znaleziono startu');
        error.statusCode = 404;
        throw error;
    }

    try {
        return await prisma.result.create({
            data
        });
    } catch (error) {
        if (error.code === 'P2002') {
            const conflictError = new Error(
                'Ten start ma już przypisany wynik'
            );

            conflictError.statusCode = 409;

            throw conflictError;
        }

        throw error;
    }
};

exports.updateResult = async (id, data) => {
    const existingResult = await prisma.result.findUnique({
        where: { id }
    });

    if (!existingResult) {
        const error = new Error('Nie znaleziono wyniku');
        error.statusCode = 404;
        throw error;
    }

    return await prisma.result.update({
        where: { id },
        data
    });
};

exports.deleteResult = async (id) => {
    const existingResult = await prisma.result.findUnique({
        where: { id }
    });

    if (!existingResult) {
        const error = new Error('Nie znaleziono wyniku');
        error.statusCode = 404;
        throw error;
    }

    await prisma.result.delete({
        where: { id }
    });

    return {
        message: 'Usunięto wynik'
    };
};

exports.getResultsByRoundId = async (roundId) => {
    const round = await prisma.round.findUnique({
        where: { id: roundId }
    });

    if (!round) {
        const error = new Error('Nie znaleziono tury');
        error.statusCode = 404;
        throw error;
    }

    return await prisma.result.findMany({
        where: {
            start: {
                roundId
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
        orderBy: [
            {
                sectorPoints: 'asc'
            }
        ]
    });
};