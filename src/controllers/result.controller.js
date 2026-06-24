const resultService = require('../services/result.service');
const resultCalculationService = require('../services/resultCalculation.service');

const {
    validateIdParam,
    validateCreateResultDto,
    validateUpdateResultDto,
    mapCreateResultDto,
    mapUpdateResultDto
} = require('../dto/result.dto');

exports.getAllResults = async (req, res) => {
    try {
        const results = await resultService.getAllResults();

        res.json(results);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania wyników'
        });
    }
};

exports.getResultById = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const result = await resultService.getResultById(id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd pobierania wyniku'
        });
    }
};

exports.createResult = async (req, res) => {
    try {
        const errors = validateCreateResultDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapCreateResultDto(req.body);

        const newResult = await resultService.createResult(data);

        res.status(201).json(newResult);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd tworzenia wyniku'
        });
    }
};

exports.updateResult = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const errors = validateUpdateResultDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapUpdateResultDto(req.body);

        const updatedResult = await resultService.updateResult(id, data);

        res.json(updatedResult);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd aktualizacji wyniku'
        });
    }
};

exports.deleteResult = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const result = await resultService.deleteResult(id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd usuwania wyniku'
        });
    }
};

exports.getResultsByRoundId = async (req, res) => {
    try {
        const roundId = validateIdParam(req.params.id);

        const results = await resultService.getResultsByRoundId(roundId);

        res.json(results);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd pobierania wyników tury'
        });
    }
};

exports.calculateSectorResults = async (req, res) => {
    try {
        const roundId = validateIdParam(req.params.roundId);
        const sectorId = validateIdParam(req.params.sectorId);

        const results = await resultCalculationService.calculateSectorResults(
            roundId,
            sectorId
        );

        res.json(results);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd obliczania wyników sektora'
        });
    }
};

exports.generateSectorResults = async (req, res) => {
    try {
        const roundId = validateIdParam(req.params.roundId);
        const sectorId = validateIdParam(req.params.sectorId);

        const results = await resultCalculationService.generateSectorResults(
            roundId,
            sectorId
        );

        res.status(201).json(results);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd generowania wyników sektora'
        });
    }
};
exports.getResultsByCompetitionRoundAndSector = async (req, res) => {
    try {
        const competitionId = validateIdParam(req.params.competitionId);
        const roundId = validateIdParam(req.params.roundId);
        const sectorId = validateIdParam(req.params.sectorId);

        const results =
            await resultService.getResultsByCompetitionRoundAndSector(
                competitionId,
                roundId,
                sectorId
            );

        res.json(results);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd pobierania wyników dla sektora'
        });
    }
};