const express = require('express');
const router = express.Router();

const roundController = require('../controllers/round.controller');

router.get('/', roundController.getAllRounds);
router.get('/:id', roundController.getRoundById);
router.post('/', roundController.createRound);
router.put('/:id', roundController.updateRound);
router.delete('/:id', roundController.deleteRound);

module.exports = router;