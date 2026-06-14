const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const resultController = require('../controllers/result.controller');

router.get('/', resultController.getAllResults);
router.get('/round/:id', resultController.getResultsByRoundId);

router.get(
    '/calculate/round/:roundId/sector/:sectorId',
    resultController.calculateSectorResults
);

router.post(
    '/generate/round/:roundId/sector/:sectorId',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER', 'JUDGE'),
    resultController.generateSectorResults
);

router.get('/:id', resultController.getResultById);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER', 'JUDGE'),
    resultController.createResult
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER', 'JUDGE'),
    resultController.updateResult
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    resultController.deleteResult
);

module.exports = router;