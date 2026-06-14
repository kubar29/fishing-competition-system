const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const competitorController = require('../controllers/competitor.controller');

router.get('/', competitorController.getAllCompetitors);
router.get('/:id', competitorController.getCompetitorById);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    competitorController.createCompetitor
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    competitorController.updateCompetitor
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN'),
    competitorController.deleteCompetitor
);

module.exports = router;