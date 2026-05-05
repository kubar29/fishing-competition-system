const express = require('express');
const router = express.Router();

const startController = require('../controllers/start.controller');

router.get('/', startController.getAllStarts);
router.post('/', startController.createStart);
router.get('/:id', startController.getStartById);
router.put('/:id', startController.updateStart);

module.exports = router;