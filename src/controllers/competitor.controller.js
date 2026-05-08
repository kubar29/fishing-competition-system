const prisma = require('../prisma/client');

exports.getAllCompetitors = async (req, res) => {
    const competitors = await prisma.competitor.findMany();
    res.json(competitors);
};

exports.createCompetitor = async (req, res) => {
    const { name, surname, category } = req.body;

    const newCompetitor = await prisma.competitor.create({
        data: {
            name,
            surname,
            category: category || null
        }
    });

    res.status(201).json(newCompetitor);
};

exports.getCompetitorById = async (req, res) => {
    const id = Number(req.params.id);

    const competitor = await prisma.competitor.findUnique({
        where: { id }
    });

    if (!competitor) {
        return res.status(404).json({ 
            message: 'Nie znaleziono zawodnika'
        });
    }

    res.json(competitor);
};