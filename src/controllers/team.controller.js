const prisma = require('../prisma/client');

// GET ALL
exports.getAllTeams = async (req, res) => {
    const teams = await prisma.team.findMany({
        include: {
            competitors: true
        }
    });

    res.json(teams);
};

// CREATE
exports.createTeams = async (req, res) => {
    const { name, competitorIds } = req.body;

    const newTeam = await prisma.team.create({
        data: {
            name,
            competitors: competitorIds && competitorIds.length > 0
                ? {
                    connect: competitorIds.map(id => ({ id }))
                }
                : undefined
        },
        include: {
            competitors: true
        }
    });

    res.status(201).json(newTeam);
};

// GET BY ID
exports.getTeamsById = async (req, res) => {
    const id = Number(req.params.id);

    const team = await prisma.team.findUnique({
        where: { id },
        include: {
            competitors: true
        }
    });

    if (!team) {
        return res.status(404).json({
            message: "Nie znaleziono drużyny"
        });
    }

    res.json(team);
};