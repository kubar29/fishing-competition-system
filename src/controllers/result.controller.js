const resultService = require('../services/result.service');
const resultCalculationService = require('../services/resultCalculation.service');

const {
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
        const id = Number(req.params.id);

        const result = await resultService.getResultById(id);

        if (!result) {
            return res.status(404).json({
                message: 'Nie znaleziono wyniku'
            });
        }

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania wyniku'
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
        const id = Number(req.params.id);

        const errors = validateUpdateResultDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapUpdateResultDto(req.body);

        console.log('UPDATE RESULT BODY:', req.body);
        console.log('UPDATE RESULT DATA:', data);

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
        const id = Number(req.params.id);

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
        const roundId = Number(req.params.id);

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
        const roundId = Number(req.params.roundId);
        const sectorId = Number(req.params.sectorId);

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
        const roundId = Number(req.params.roundId);
        const sectorId = Number(req.params.sectorId);

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