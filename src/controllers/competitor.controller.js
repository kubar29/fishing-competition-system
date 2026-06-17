const competitorService = require('../services/competitor.service');

const {
    validateCreateCompetitorDto,
    validateUpdateCompetitorDto,
    mapCreateCompetitorDto,
    mapUpdateCompetitorDto
} = require('../dto/competitor.dto');

exports.getAllCompetitors = async (req, res) => {
    try {
        const competitors = await competitorService.getAllCompetitors();

        res.json(competitors);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania zawodników'
        });
    }
};

exports.createCompetitor = async (req, res) => {
    try {
        const errors = validateCreateCompetitorDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapCreateCompetitorDto(req.body);

        const newCompetitor = await competitorService.createCompetitor(data);

        res.status(201).json(newCompetitor);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd tworzenia zawodnika'
        });
    }
};

exports.getCompetitorById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const competitor = await competitorService.getCompetitorById(id);

        res.json(competitor);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd pobierania zawodnika'
        });
    }
};

exports.updateCompetitor = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const errors = validateUpdateCompetitorDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapUpdateCompetitorDto(req.body);

        const updatedCompetitor = await competitorService.updateCompetitor(
            id,
            data
        );

        res.json(updatedCompetitor);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd aktualizacji zawodnika'
        });
    }
};

exports.deleteCompetitor = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await competitorService.deleteCompetitor(id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd usuwania zawodnika'
        });
    }
};