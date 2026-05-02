const express = require('express');
const router = express.Router();

const competitorController = require('../controllers/competitor.controller');

router.get('/', competitorController.getAllCompetitors);
router.post('/', competitorController.createCompetitor);
router.get('/:id', competitorController.getCompetitorById);

module.exports = router;