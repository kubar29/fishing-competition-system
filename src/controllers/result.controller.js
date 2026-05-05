const resultService = require('../services/result.service');

exports.calculateSectorResults = async (req, res) => {
    const { roundId, sector } =req.body;

    const result = await resultService.calculateSector(roundId, sector);
    res.json(result);
}


exports.testStarts = async (req, res) => {
    const data = await resultService.testStarts();
    res.json(data);
};