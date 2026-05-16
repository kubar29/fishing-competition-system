const prisma = require('../prisma/client');

exports.getTeamMembers = async (req, res) => {
    try {
        const teamId = Number(req.params.teamId);

        const team = await prisma.team.findUnique({
            where: { id: teamId }
        });

        if (!team) {
            return res.status(404).json({
                message: 'Drużyna nie istnieje'
            });
        }


        const members = await prisma.teamMember.findMany({
            where: { teamId },

            include: {
                competitor: true
            }
        });

        res.json(members);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania składu drużyny'
        });
    }
};

exports.addMember = async (req, res) => {
    try {
        const teamId = Number(req.params.teamId);
        const { competitorId } = req.body;

        if (!competitorId) {
            return res.status(400).json({
                message: 'Brak competitorId'
            });
        }

        const team = await prisma.team.findUnique({
            where: { id: teamId }
        });

        if (!team) {
            return res.status(404).json({
                message: 'Drużyna nie istnieje'
            });
        }

        const competitor = await prisma.competitor.findUnique({
            where: { id: competitorId }
        });

        if (!competitor) {
            return res.status(404).json({
                message: 'Zawodnik nie istnieje'
            });
        }

        const existingMember = await prisma.teamMember.findFirst({
            where: {
                teamId,
                competitorId
            }
        });

        if (existingMember) {
            return res.status(409).json({
                message: 'Zawodnik już jest w drużynie'
            });
        }

        const member = await prisma.teamMember.create({
            data: {
                teamId,
                competitorId
            },

            include: {
                competitor: true
            }
        });

        res.status(201).json(member);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd dodawania zawodnika do drużyny'
        });
    }
};

exports.removeMember = async (req, res) => {
    try {
        const teamId = Number(req.params.teamId);
        const competitorId = Number(req.params.competitorId);

        const deleted = await prisma.teamMember.deleteMany({
            where: {
                teamId,
                competitorId
            }
        });

        if (deleted.count === 0) {
            return res.status(404).json({
                message: 'Zawodnik nie należy do tej drużyny'
            });
        }

        res.json({
            message: 'Usunięto zawodnika z drużyny'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd usuwania zawodnika z drużyny'
        });
    }
};