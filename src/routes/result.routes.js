const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result.controller');

router.post('/calculate', resultController.calculateSectorResults);
router.get('/test-starts', resultController.testStarts);

module.exports = router;