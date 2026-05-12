const express = require('express');
const router = express.Router();

const competitorController = require('../controllers/competitor.controller');

router.get('/', competitorController.getAllCompetitors);
router.get('/:id', competitorController.getCompetitorById);
router.post('/', competitorController.createCompetitor);
router.put('/:id', competitorController.updateCompetitor);
router.delete('/:id', competitorController.deleteCompetitor);

module.exports = router;