const prisma = require('../prisma/client');

exports.getAllStarts = async (req, res) => {
    try {
        const starts = await prisma.start.findMany();

        res.json(starts);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania startów'
        });
    }
};

exports.createStart = async (req, res) => {
    try {
        const {
            competitorId,
            roundId,
            sectorId,
            position,
            weight,
            penaltyPoints,
            sectorPoints,
            subSector
        } = req.body;

        const competitor = await prisma.competitor.findUnique({
            where: { id: Number(competitorId) }
        });

        if (!competitor) {
            return res.status(404).json({
                message: 'Nie znaleziono zawodnika'
            });
        }

        const round = await prisma.round.findUnique({
            where: { id: Number(roundId) }
        });

        if (!round) {
            return res.status(404).json({
                message: 'Nie znaleziono tury'
            });
        }

        const sector = await prisma.sector.findUnique({
            where: { id: Number(sectorId) }
        });

        if (!sector) {
            return res.status(404).json({
                message: 'Nie znaleziono sektora'
            });
        }

        if (sector.roundId !== Number(roundId)) {
            return res.status(400).json({
                message: 'Sektor nie należy do wybranej tury'
            });
        }

        const newStart = await prisma.start.create({
            data: {
                competitorId: Number(competitorId),
                roundId: Number(roundId),
                sectorId: Number(sectorId),
                ...(position !== undefined && { position: Number(position) }),
                ...(weight !== undefined && { weight: Number(weight) }),
                ...(penaltyPoints !== undefined && { penaltyPoints: Number(penaltyPoints) }),
                ...(sectorPoints !== undefined && { sectorPoints: Number(sectorPoints) }),
                ...(subSector !== undefined && { subSector })
            }
        });

        res.status(201).json(newStart);
    } catch (error) {
        console.error(error);

        if (error.code === 'P2002') {
            return res.status(409).json({
                message: 'Ten zawodnik ma już start w tej turze'
            });
        }

        res.status(500).json({
            message: 'Błąd tworzenia startu'
        });
    }
};

exports.getStartById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const start = await prisma.start.findUnique({
            where: { id },
            include: {
                competitor: true,
                round: true,
                sector: true
            }
        });

        if (!start) {
            return res.status(404).json({
                message: 'Nie znaleziono startu'
            });
        }

        res.json(start);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania startu'
        });
    }
};

exports.updateStart = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            sectorId,
            position,
            weight,
            penaltyPoints,
            sectorPoints,
            subSector
        } = req.body;

        const existingStart = await prisma.start.findUnique({
            where: { id }
        });

        if (!existingStart) {
            return res.status(404).json({
                message: 'Nie znaleziono startu'
            });
        }

        if (sectorId !== undefined) {
            const sector = await prisma.sector.findUnique({
                where: { id: Number(sectorId) }
            });

            if (!sector) {
                return res.status(404).json({
                    message: 'Nie znaleziono sektora'
                });
            }

            if (sector.roundId !== existingStart.roundId) {
                return res.status(400).json({
                    message: 'Sektor nie należy do tury tego startu'
                });
            }
        }

        const updatedStart = await prisma.start.update({
            where: { id },
            data: {
                ...(sectorId !== undefined && { sectorId: Number(sectorId) }),
                ...(position !== undefined && { position: Number(position) }),
                ...(weight !== undefined && { weight: Number(weight) }),
                ...(penaltyPoints !== undefined && { penaltyPoints: Number(penaltyPoints) }),
                ...(sectorPoints !== undefined && { sectorPoints: Number(sectorPoints) }),
                ...(subSector !== undefined && { subSector })
            }
        });

        res.json(updatedStart);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd aktualizacji startu'
        });
    }
};

exports.deleteStart = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const start = await prisma.start.findUnique({
            where: { id }
        });

        if (!start) {
            return res.status(404).json({
                message: 'Nie znaleziono startu'
            });
        }

        await prisma.start.delete({
            where: { id }
        });

        res.json({
            message: 'Usunięto start'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd usuwania startu'
        });
    }
};