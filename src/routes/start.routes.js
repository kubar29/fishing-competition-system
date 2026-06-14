const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const startController = require('../controllers/start.controller');

router.get('/', startController.getAllStarts);
router.get('/:id', startController.getStartById);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    startController.createStart
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER', 'JUDGE'),
    startController.updateStart
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    startController.deleteStart
);

module.exports = router;