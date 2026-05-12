const prisma = require('../prisma/client');

exports.getAllCompetitors = async (req, res) => {
    try{
        const competitors = await prisma.competitor.findMany();
        res.json(competitors);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Błąd pobierania zawodników'
        });
    }
};

exports.createCompetitor = async (req, res) => {
    try{
        const { name, surname, category } = req.body;

        const newCompetitor = await prisma.competitor.create({
            data: {
                name,
                surname,
                category: category || null
            }
        });

        res.status(201).json(newCompetitor);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd tworzenia zawodnika'
        });
    }
};

exports.getCompetitorById = async (req, res) => {
    try{
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
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania zawodnika'
        });
    }
    
};

exports.updateCompetitor = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            name,
            surname,
            category
        } = req.body;

        const existingCompetitor = await prisma.competitor.findUnique({
            where: { id }
        });

        if (!existingCompetitor) {
            return res.status(404).json({
                message: 'Nie znaleziono zawodnika'
            });
        }

        const updatedCompetitor = await prisma.competitor.update({
            where: { id },

            data: {
                ...(name !== undefined && { name }),
                ...(surname !== undefined && { surname }),
                ...(category !== undefined && { category })
            }
        });

        res.json(updatedCompetitor);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd aktualizacji zawodnika'
        });
    }
};

exports.deleteCompetitor = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const competitor = await prisma.competitor.findUnique({
            where: { id }
        });

        if (!competitor) {
            return res.status(404).json({
                message: 'Nie znaleziono zawodnika'
            });
        }

        await prisma.competitor.delete({
            where: { id }
        });

        res.json({
            message: 'Usunięto zawodnika'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd usuwania zawodnika'
        });
    }
};