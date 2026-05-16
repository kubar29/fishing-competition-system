const prisma = require('../prisma/client');

exports.getAllSectors = async (req, res) => {
    try {
        const sectors = await prisma.sector.findMany();

        res.json(sectors);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania sektorów'
        });
    }
};

exports.createSector = async (req, res) => {
    try {
        const { name, roundId } = req.body;

        const round = await prisma.round.findUnique({
            where: { id: Number(roundId) }
        });

        if (!round) {
            return res.status(404).json({
                message: 'Nie znaleziono tury'
            });
        }

        const newSector = await prisma.sector.create({
            data: {
                name,
                roundId: Number(roundId)
            }
        });

        res.status(201).json(newSector);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd tworzenia sektora'
        });
    }
};

exports.getSectorById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const sector = await prisma.sector.findUnique({
            where: { id },
            include: {
                round: true,
                starts: true
            }
        });

        if (!sector) {
            return res.status(404).json({
                message: 'Nie znaleziono sektora'
            });
        }

        res.json(sector);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania sektora'
        });
    }
};

exports.updateSector = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { name, roundId } = req.body;

        const existingSector = await prisma.sector.findUnique({
            where: { id }
        });

        if (!existingSector) {
            return res.status(404).json({
                message: 'Nie znaleziono sektora'
            });
        }

        if (roundId !== undefined) {
            const round = await prisma.round.findUnique({
                where: { id: Number(roundId) }
            });

            if (!round) {
                return res.status(404).json({
                    message: 'Nie znaleziono tury'
                });
            }
        }

        const updatedSector = await prisma.sector.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(roundId !== undefined && { roundId: Number(roundId) })
            }
        });

        res.json(updatedSector);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd aktualizacji sektora'
        });
    }
};

exports.deleteSector = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const sector = await prisma.sector.findUnique({
            where: { id }
        });

        if (!sector) {
            return res.status(404).json({
                message: 'Nie znaleziono sektora'
            });
        }

        await prisma.sector.delete({
            where: { id }
        });

        res.json({
            message: 'Usunięto sektor'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd usuwania sektora'
        });
    }
};