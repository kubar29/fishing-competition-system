const prisma = require('../prisma/client');

const findCompetitorOrThrow = async (id) => {
    const competitor = await prisma.competitor.findUnique({
        where: { id }
    });

    if (!competitor) {
        const error = new Error('Nie znaleziono zawodnika');
        error.statusCode = 404;
        throw error;
    }

    return competitor;
};

exports.getAllCompetitors = async () => {
    return await prisma.competitor.findMany();
};

exports.getCompetitorById = async (id) => {
    return await findCompetitorOrThrow(id);
};

exports.createCompetitor = async (data) => {
    return await prisma.competitor.create({
        data
    });
};

exports.updateCompetitor = async (id, data) => {
    await findCompetitorOrThrow(id);

    return await prisma.competitor.update({
        where: { id },
        data
    });
};

exports.deleteCompetitor = async (id) => {
    await findCompetitorOrThrow(id);

    await prisma.competitor.delete({
        where: { id }
    });

    return {
        message: 'Usunięto zawodnika'
    };
};