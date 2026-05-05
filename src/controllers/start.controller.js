const prisma = require('../prisma/client');

exports.getAllStarts = async (req, res) => {
    const starts = await prisma.start.findMany();
    res.json(starts);
};

exports.createStart = async (req, res) => {
    const {
        competitorId,
        teamId,
        roundId,
        sector,
        subSector,
        position,
    } = req.body;

    const newStart = await prisma.start.create({
        data: {
            competitorId,
            //teamId: teamId || null,
            roundId,
            sector,
            subSector: subSector || null,
            position: position || null,
            weight: 0,
            sectorPoints: 0,
            penaltyPoints: 0,
        }
    });

    res.status(201).json(newStart);
};

exports.getStartById = async (req, res) => {
    const id = Number(req.params.id);

    const start = await prisma.start.findUnique({
        where: { id }
    });

    if (!start) {
        return res.status(404).json({ message: 'Start nie istnieje' });
    }

    res.json(start);
};


exports.updateStart = async (req, res) => {
    const id = Number(req.params.id);
    const { weight, penaltyPoints } = req.body;

    try {
        const updated = await prisma.start.update({
            where: { id },
            data: {
                weight,
                penaltyPoints
            }
        });

        res.json(updated);
    } catch (err) {
        return res.status(404).json({ message: 'Start nie istnieje' });
    }
};