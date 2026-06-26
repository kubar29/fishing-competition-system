const startService = require('../services/start.service');

const {
    validateIdParam,
    validateCreateStartDto,
    validateUpdateStartDto,
    mapCreateStartDto,
    mapUpdateStartDto
} = require('../dto/start.dto');

exports.getAllStarts = async (req, res) => {
    try {
        const starts = await startService.getAllStarts();

        res.json(starts);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania startów'
        });
    }
};

exports.getStartById = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const start = await startService.getStartById(id);

        res.json(start);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd pobierania startu'
        });
    }
};

exports.createStart = async (req, res) => {
    try {
        const errors = validateCreateStartDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const data = mapCreateStartDto(req.body);

        const newStart = await startService.createStart(data);

        res.status(201).json(newStart);
    } catch (error) {
        console.error(error);

        if (error.code === 'P2002') {
            return res.status(409).json({
                message: 'Ten zawodnik ma już start w tej turze'
            });
        }

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd tworzenia startu'
        });
    }
};

exports.updateStart = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const errors = validateUpdateStartDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const data = mapUpdateStartDto(req.body);

        const updatedStart = await startService.updateStart(id, data);

        res.json(updatedStart);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd aktualizacji startu'
        });
    }
};

exports.deleteStart = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const result = await startService.deleteStart(id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd usuwania startu'
        });
    }
};

exports.getStartsByCompetitionRoundAndSector = async (req, res) => {
    try {
        const competitionId = validateIdParam(req.params.competitionId);
        const roundId = validateIdParam(req.params.roundId);
        const sectorId = validateIdParam(req.params.sectorId);

        const starts = await startService.getStartsByCompetitionRoundAndSector(
            competitionId,
            roundId,
            sectorId
        );

        res.json(starts);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd pobierania startów dla sektora'
        });
    }
};