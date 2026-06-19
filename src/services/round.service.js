const prisma = require('../prisma/client');

const roundInclude = {
    competition: true,
    sectors: true,
    starts: true
};

const findRoundOrThrow = async (id) => {
    const round = await prisma.round.findUnique({
        where: { id },
        include: roundInclude
    });

    if (!round) {
        const error = new Error('Nie znaleziono tury');
        error.statusCode = 404;
        throw error;
    }

    return round;
};

const findCompetitionOrThrow = async (competitionId) => {
    const competition = await prisma.competition.findUnique({
        where: { id: competitionId }
    });

    if (!competition) {
        const error = new Error('Nie znaleziono zawodów');
        error.statusCode = 404;
        throw error;
    }

    return competition;
};

exports.getAllRounds = async () => {
    return await prisma.round.findMany({
        include: roundInclude
    });
};

exports.getRoundById = async (id) => {
    return await findRoundOrThrow(id);
};

exports.createRound = async (data) => {
    await findCompetitionOrThrow(data.competitionId);

    return await prisma.round.create({
        data,
        include: roundInclude
    });
};

exports.updateRound = async (id, data) => {
    await findRoundOrThrow(id);

    if (data.competitionId !== undefined) {
        await findCompetitionOrThrow(data.competitionId);
    }

    return await prisma.round.update({
        where: { id },
        data,
        include: roundInclude
    });
};

exports.deleteRound = async (id) => {
    await findRoundOrThrow(id);

    await prisma.round.delete({
        where: { id }
    });

    return {
        message: 'Usunięto turę'
    };
};