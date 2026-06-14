const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const teamController = require('../controllers/team.controller');
const teamMemberController = require('../controllers/teamMember.controller');

// team
router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamsById);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    teamController.createTeams
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    teamController.updateTeam
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN'),
    teamController.deleteTeam
);

// teamMember
router.get('/:teamId/members', teamMemberController.getTeamMembers);

router.post(
    '/:teamId/members',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    teamMemberController.addMember
);

router.delete(
    '/:teamId/members/:competitorId',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    teamMemberController.removeMember
);

module.exports = router;