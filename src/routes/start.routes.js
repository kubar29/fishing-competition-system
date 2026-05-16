const express = require('express');
const router = express.Router();

const startController = require('../controllers/start.controller');

router.get('/', startController.getAllStarts);
router.get('/:id', startController.getStartById);
router.post('/', startController.createStart);
router.put('/:id', startController.updateStart);
router.delete('/:id', startController.deleteStart);

module.exports = router;