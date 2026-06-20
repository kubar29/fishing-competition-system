const competitionService = require('../services/competition.service');

const {
    validateCreateCompetitionDto,
    validateUpdateCompetitionDto,
    validateIdParam,
    mapCreateCompetitionDto,
    mapUpdateCompetitionDto
} = require('../dto/competition.dto');

exports.getAllCompetitions = async (req, res) => {
    try {
        const competitions = await competitionService.getAllCompetitions();

        res.json(competitions);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania zawodów'
        });
    }
};

exports.createCompetition = async (req, res) => {
    try {
        const errors = validateCreateCompetitionDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapCreateCompetitionDto(req.body);

        const newCompetition = await competitionService.createCompetition(data);

        res.status(201).json(newCompetition);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd tworzenia zawodów'
        });
    }
};

exports.getCompetitionById = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const competition = await competitionService.getCompetitionById(id);

        res.json(competition);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd pobierania zawodów'
        });
    }
};

exports.updateCompetition = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const errors = validateUpdateCompetitionDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapUpdateCompetitionDto(req.body);

        const updatedCompetition = await competitionService.updateCompetition(id, data);

        res.json(updatedCompetition);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd aktualizacji zawodów'
        });
    }
};

exports.deleteCompetition = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const result = await competitionService.deleteCompetition(id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd usuwania zawodów'
        });
    }
};