const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const startController = require('../controllers/start.controller');


/**
 * @swagger
 * /starts:
 *   get:
 *     summary: Pobierz wszystkie starty
 *     tags: [Starts]
 *     responses:
 *       200:
 *         description: Lista startów
 */
router.get('/', startController.getAllStarts);

/**
 * @swagger
 * /starts/{id}:
 *   get:
 *     summary: Pobierz start po ID
 *     tags: [Starts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dane startu
 *       404:
 *         description: Nie znaleziono startu
 */
router.get('/:id', startController.getStartById);


/**
 * @swagger
 * /starts:
 *   post:
 *     summary: Utwórz start zawodnika
 *     tags: [Starts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - competitorId
 *               - roundId
 *               - sectorId
 *             properties:
 *               competitorId:
 *                 type: integer
 *                 example: 1
 *               roundId:
 *                 type: integer
 *                 example: 1
 *               sectorId:
 *                 type: integer
 *                 example: 1
 *               position:
 *                 type: integer
 *                 example: 5
 *               weight:
 *                 type: integer
 *                 example: 7230
 *               penaltyPoints:
 *                 type: integer
 *                 example: 0
 *               sectorPoints:
 *                 type: number
 *                 example: 5
 *               subSector:
 *                 type: string
 *                 example: A1
 *     responses:
 *       201:
 *         description: Utworzono start
 *       400:
 *         description: Nieprawidłowe dane
 *       404:
 *         description: Nie znaleziono zawodnika, tury lub sektora
 *       409:
 *         description: Zawodnik ma już start w tej turze
 *       403:
 *         description: Brak uprawnień
 */
router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    startController.createStart
);


/**
 * @swagger
 * /starts/{id}:
 *   put:
 *     summary: Aktualizuj start
 *     tags: [Starts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectorId:
 *                 type: integer
 *               position:
 *                 type: integer
 *               weight:
 *                 type: integer
 *               penaltyPoints:
 *                 type: integer
 *               sectorPoints:
 *                 type: number
 *               subSector:
 *                 type: string
 *     responses:
 *       200:
 *         description: Start zaktualizowany
 *       404:
 *         description: Nie znaleziono startu
 *       403:
 *         description: Brak uprawnień
 */
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER', 'JUDGE'),
    startController.updateStart
);


/**
 * @swagger
 * /starts/{id}:
 *   delete:
 *     summary: Usuń start
 *     tags: [Starts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Start usunięty
 *       404:
 *         description: Nie znaleziono startu
 *       403:
 *         description: Brak uprawnień
 */
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    startController.deleteStart
);

module.exports = router;