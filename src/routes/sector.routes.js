const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const sectorController = require('../controllers/sector.controller');

router.get('/', sectorController.getAllSectors);
router.get('/:id', sectorController.getSectorById);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    sectorController.createSector
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    sectorController.updateSector
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    sectorController.deleteSector
);

module.exports = router;