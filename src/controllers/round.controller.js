const prisma = require('../prisma/client');

exports.getAllRounds = async (req, res) => {
    try {
        const rounds = await prisma.round.findMany();

        res.json(rounds);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania tur'
        });
    }
};

exports.createRound = async (req, res) => {
    try {
        const { name, number, competitionId } = req.body;

        const competition = await prisma.competition.findUnique({
            where: { id: Number(competitionId) }
        });

        if (!competition) {
            return res.status(404).json({
                message: 'Nie znaleziono zawodów'
            });
        }

        const newRound = await prisma.round.create({
            data: {
                name,
                number: Number(number),
                competitionId: Number(competitionId)
            }
        });

        res.status(201).json(newRound);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd tworzenia tury'
        });
    }
};

exports.getRoundById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const round = await prisma.round.findUnique({
            where: { id },
            include: {
                competition: true,
                sectors: true,
                starts: true
            }
        });

        if (!round) {
            return res.status(404).json({
                message: 'Nie znaleziono tury'
            });
        }

        res.json(round);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania tury'
        });
    }
};

exports.updateRound = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { name, number, competitionId } = req.body;

        const existingRound = await prisma.round.findUnique({
            where: { id }
        });

        if (!existingRound) {
            return res.status(404).json({
                message: 'Nie znaleziono tury'
            });
        }

        if (competitionId !== undefined) {
            const competition = await prisma.competition.findUnique({
                where: { id: Number(competitionId) }
            });

            if (!competition) {
                return res.status(404).json({
                    message: 'Nie znaleziono zawodów'
                });
            }
        }

        const updatedRound = await prisma.round.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(number !== undefined && { number: Number(number) }),
                ...(competitionId !== undefined && { competitionId: Number(competitionId) })
            }
        });

        res.json(updatedRound);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd aktualizacji tury'
        });
    }
};

exports.deleteRound = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const round = await prisma.round.findUnique({
            where: { id }
        });

        if (!round) {
            return res.status(404).json({
                message: 'Nie znaleziono tury'
            });
        }

        await prisma.round.delete({
            where: { id }
        });

        res.json({
            message: 'Usunięto turę'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd usuwania tury'
        });
    }
};