const { param } = require("../app");

let starts = [];

exports.getAllStarts = (req, res) => {
    res.json(starts);
};

exports.createStart = (req,res) => {
    const {
        competitorId,
        teamId,
        roundId,
        sector,
        subSector,
        position,
    } = req.body;

    const newStart = {
        id: Date.now(),
        competitorId,
        teamId: teamId || null,
        roundId,
        sector,
        subSector: subSector || null,
        position,
        weight: 0,
        sectorPoinst: 0,
        penaltyPoints: 0,
    };

    starts.push(newStart);

    res.status(201).json(newStart);
};

exports.getStartById = (req, res) => {
    const id = parseInt(req.params.id);

    const start = starts.find(s => s.id === id);

    if(!start) {
        return res.status(404).json({ message: 'Start nie istnieje'});
    }

    res.json(start);
}