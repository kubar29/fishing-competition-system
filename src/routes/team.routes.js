const express = require('express');
const router = express.Router();

const teamController = require('../controllers/team.controller');

router.get('/', teamController.getAllTeams);
router.post('/', teamController.createTeams);
router.get('/:id', teamController.getTeamsById);

module.exports = router;