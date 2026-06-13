const express = require('express');
const router = express.Router();

const resultController = require('../controllers/result.controller');

router.get('/', resultController.getAllResults);
router.get('/round/:id', resultController.getResultsByRoundId);

router.get('/calculate/round/:roundId/sector/:sectorId', resultController.calculateSectorResults);

router.post('/generate/round/:roundId/sector/:sectorId', resultController.generateSectorResults);

router.get('/:id', resultController.getResultById);
router.post('/', resultController.createResult);
router.put('/:id', resultController.updateResult);
router.delete('/:id', resultController.deleteResult);

module.exports = router;