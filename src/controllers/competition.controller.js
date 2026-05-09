const prisma = require('../prisma/client');

exports.getAllCompetitions = async (reg,res) => {
    const competitions = await prisma.competition.findMany();
    res.json(competitions)
}

exports.createCompetition = async (req, res) => {
    const {name, date} = req.body;

    const newCompetition = await prisma.competition.create({
        data: {
            name,
            date: new Date(date)
        }
    });

    res.status(201).json(newCompetition)
};

exports.getCompetitionById = async (req, res) => {
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
};

exports.deleteCompetition = async (req,res) => {
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
};
