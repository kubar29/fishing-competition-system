const prisma = require('../prisma/client');

const findCompetitionOrThrow = async (id) => {
    const competition = await prisma.competition.findUnique({
        where: { id }
    });

    if (!competition) {
        const error = new Error('Nie znaleziono zawodów');
        error.statusCode = 404;
        throw error;
    }

    return competition;
};

exports.getAllCompetitions = async () => {
    return await prisma.competition.findMany();
};

exports.getCompetitionById = async (id) => {
    return await findCompetitionOrThrow(id);
};

exports.createCompetition = async (data) => {
    return await prisma.competition.create({
        data
    });
};

exports.updateCompetition = async (id, data) => {
    await findCompetitionOrThrow(id);

    return await prisma.competition.update({
        where: { id },
        data
    });
};

exports.deleteCompetition = async (id) => {
    await findCompetitionOrThrow(id);

    await prisma.competition.delete({
        where: { id }
    });

    return {
        message: 'Usunięto zawody'
    };
};
exports.getCompetitionStructure = async (competitionId) => {
    const competition = await prisma.competition.findUnique({
        where: { id: competitionId },
        include: {
            rounds: {
                include: {
                    sectors: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    number: 'asc'
                }
            }
        }
    });

    if (!competition) {
        const error = new Error('Nie znaleziono zawodów');
        error.statusCode = 404;
        throw error;
    }

    return {
        competitionId: competition.id,
        competitionName: competition.name,
        rounds: competition.rounds.map((round) => ({
            id: round.id,
            name: round.name,
            number: round.number,
            sectors: round.sectors
        }))
    };
};