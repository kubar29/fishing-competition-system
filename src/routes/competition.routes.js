const express = require('express');
const router = express.Router();

const competitionContrller = require('../controllers/competition.controller')

router.get('/', competitionContrller.getAllCompetitions);
router.post('/', competitionContrller.createCompetition);

module.exports = router;