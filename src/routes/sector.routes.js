const express = require('express');
const router = express.Router();

const sectorController = require('../controllers/sector.controller');

router.get('/', sectorController.getAllSectors);
router.get('/:id', sectorController.getSectorById);
router.post('/', sectorController.createSector);
router.put('/:id', sectorController.updateSector);
router.delete('/:id', sectorController.deleteSector);

module.exports = router;