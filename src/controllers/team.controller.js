const prisma = require('../prisma/client');

// GET ALL
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await prisma.team.findMany({
            include: {
                competition: true,
                members: {
                    include: {
                        competitor: true
                    }
                }
            }
        });

        res.json(teams);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania drużyn'
        });
    }
};

// GET BY ID
exports.getTeamsById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const team = await prisma.team.findUnique({
            where: { id },

            include: {
                competition: true,
                members: {
                    include: {
                        competitor: true
                    }
                }
            }
        });

        if (!team) {
            return res.status(404).json({
                message: 'Nie znaleziono drużyny'
            });
        }

        res.json(team);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania drużyny'
        });
    }
};

// CREATE
exports.createTeams = async (req, res) => {
    try {
        const { name, competitionId } = req.body;

        if (!name) {
            return res.status(400).json({
                message: 'Brak nazwy drużyny'
            });
        }

        const team = await prisma.team.create({
            data: {
                name,
                competitionId
            }
        });

        res.status(201).json(team);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd tworzenia drużyny'
        });
    }
};

// UPDATE
exports.updateTeam = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            name,
            competitionId
        } = req.body;

        const existingTeam = await prisma.team.findUnique({
            where: { id }
        });

        if (!existingTeam) {
            return res.status(404).json({
                message: 'Nie znaleziono drużyny'
            });
        }

        const updatedTeam = await prisma.team.update({
            where: { id },

            data: {
                ...(name !== undefined && { name }),
                ...(competitionId !== undefined && { competitionId })
            }
        });

        res.json(updatedTeam);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd aktualizacji drużyny'
        });
    }
};

// DELETE
exports.deleteTeam = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const team = await prisma.team.findUnique({
            where: { id }
        });

        if (!team) {
            return res.status(404).json({
                message: 'Nie znaleziono drużyny'
            });
        }

        await prisma.team.delete({
            where: { id }
        });

        res.json({
            message: 'Usunięto drużynę'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd usuwania drużyny'
        });
    }
};