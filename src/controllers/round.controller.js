const roundService = require('../services/round.service');
const {
    validateCreateRoundDto,
    validateUpdateRoundDto,
    validateIdParam,
    mapCreateRoundDto,
    mapUpdateRoundDto
} = require('../dto/round.dto');

exports.getAllRounds = async (req, res) => {
    try {
        const rounds = await roundService.getAllRounds();

        res.json(rounds);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania tur'
        });
    }
};

exports.getRoundById = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const round = await roundService.getRoundById(id);

        res.json(round);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd pobierania tury'
        });
    }
};

exports.createRound = async (req, res) => {
    try {
        const errors = validateCreateRoundDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const data = mapCreateRoundDto(req.body);

        const newRound = await roundService.createRound(data);

        res.status(201).json(newRound);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd tworzenia tury'
        });
    }
};

exports.updateRound = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const errors = validateUpdateRoundDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const data = mapUpdateRoundDto(req.body);

        const updatedRound = await roundService.updateRound(id, data);

        res.json(updatedRound);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd aktualizacji tury'
        });
    }
};

exports.deleteRound = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const result = await roundService.deleteRound(id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd usuwania tury'
        });
    }
};