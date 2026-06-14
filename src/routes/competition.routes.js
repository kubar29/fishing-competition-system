const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const competitionController = require('../controllers/competition.controller')

router.get('/', competitionController.getAllCompetitions);
router.get('/:id', competitionController.getCompetitionById);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    competitionController.createCompetition
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    competitionController.updateCompetition
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN'),
    competitionController.deleteCompetition
);

module.exports = router;