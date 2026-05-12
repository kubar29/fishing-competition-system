const express = require('express');
const router = express.Router();

const teamController = require('../controllers/team.controller');
const teamMemberController = require('../controllers/teamMember.controller');

//team
router.get('/', teamController.getAllTeams);
router.post('/', teamController.createTeams);
router.get('/:id', teamController.getTeamsById);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

//teamMember
router.post('/:teamId/members', teamMemberController.addMember);
router.get('/:teamId/members', teamMemberController.getTeamMembers);
router.delete('/:teamId/members/:competitorId', teamMemberController.removeMember);

module.exports = router;