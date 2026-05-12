const prisma = require('../prisma/client');

exports.getAllCompetitions = async (req, res) => {
    try {
        const competitions = await prisma.competition.findMany();
        res.json(competitions);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania zawodów'
        });
    }
}

exports.createCompetition = async (req, res) => {
    try {
        const {name, date} = req.body;

        const newCompetition = await prisma.competition.create({
            data: {
                name,
                date: new Date(date)
            }
        });

        res.status(201).json(newCompetition)

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd tworzenia zawodów'
        });
    }
};

exports.getCompetitionById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const competition = await prisma.competition.findUnique({
            where: { id }
        });

        if(!competition){
            return res.status(404).json({
                message: "Nie znaleziono zawodów"
            });
        }

        res.json(competition)
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania zawodów'
        });
    }
    
};

exports.updateCompetition = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            name,
            date
        } = req.body;

        const existingCompetition = await prisma.competition.findUnique({
            where: { id }
        });

        if (!existingCompetition) {
            return res.status(404).json({
                message: 'Nie znaleziono zawodów'
            });
        }

        const updatedCompetition = await prisma.competition.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(date !== undefined && { date: new Date(date) })
            }
        });

        res.json(updatedCompetition);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd aktualizacji zawodów'
        });
    }
};

exports.deleteCompetition = async (req,res) => {
    try {
        const id = Number(req.params.id);

        const competition = await prisma.competition.findUnique({
            where: { id }
        });

        if (!competition) {
            return res.status(404).json({
                message:"Nie znaleziono zawodów"
            });
        }
        await prisma.competition.delete({
            where: { id }
        })

        res.json({ 
            message: 'Usunięto zawody'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd usuwania zawodów'
        });
    }
    
};
