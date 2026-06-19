const sectorService = require('../services/sector.service');

const {
    validateIdParam,
    validateCreateSectorDto,
    validateUpdateSectorDto,
    mapCreateSectorDto,
    mapUpdateSectorDto
} = require('../dto/sector.dto');

exports.getAllSectors = async (req, res) => {
    try {
        const sectors = await sectorService.getAllSectors();

        res.json(sectors);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania sektorów'
        });
    }
};

exports.getSectorById = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const sector = await sectorService.getSectorById(id);

        res.json(sector);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd pobierania sektora'
        });
    }
};

exports.createSector = async (req, res) => {
    try {
        const errors = validateCreateSectorDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const data = mapCreateSectorDto(req.body);

        const newSector = await sectorService.createSector(data);

        res.status(201).json(newSector);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd tworzenia sektora'
        });
    }
};

exports.updateSector = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const errors = validateUpdateSectorDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const data = mapUpdateSectorDto(req.body);

        const updatedSector = await sectorService.updateSector(id, data);

        res.json(updatedSector);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd aktualizacji sektora'
        });
    }
};

exports.deleteSector = async (req, res) => {
    try {
        const id = validateIdParam(req.params.id);

        const result = await sectorService.deleteSector(id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message || 'Błąd usuwania sektora'
        });
    }
};