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

router.get(
    '/competition/:competitionId/round/:roundId/sector/:sectorId',
    startController.getStartsByCompetitionRoundAndSector
);

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
 *               - competitionEntryId
 *               - competitorId
 *               - roundId
 *               - sectorId
 *               - pegNumber
 *             properties:
 *               competitionEntryId:
 *                 type: integer
 *                 example: 1
 *               competitorId:
 *                 type: integer
 *                 example: 1
 *               roundId:
 *                 type: integer
 *                 example: 1
 *               sectorId:
 *                 type: integer
 *                 example: 1
 *               pegNumber:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Utworzono start
 *       400:
 *         description: Nieprawidłowe dane
 *       404:
 *         description: Nie znaleziono zawodnika, zgłoszenia, tury lub sektora
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
 * /starts/{id}/weigh:
 *   patch:
 *     summary: Zapisz wynik ważenia zawodnika
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weight
 *             properties:
 *               weight:
 *                 type: integer
 *                 minimum: 0
 *                 example: 7230
 *               penaltyPoints:
 *                 type: integer
 *                 minimum: 0
 *                 example: 2
 *     responses:
 *       200:
 *         description: Wynik ważenia zapisany
 *       400:
 *         description: Nieprawidłowe dane
 *       403:
 *         description: Brak uprawnień do sektora
 *       404:
 *         description: Nie znaleziono startu
 *       409:
 *         description: Sektor został zakończony
 */

router.patch(
    '/:id/weigh',
    authMiddleware,
    roleMiddleware('JUDGE', 'ORGANIZER', 'ADMIN'),
    startController.weighStart
);


/**
 * @swagger
 * /starts/{id}:
 *   put:
 *     summary: Aktualizuj dane organizacyjne startu
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
 *                 example: 1
 *               pegNumber:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Start zaktualizowany
 *       400:
 *         description: Nieprawidłowe dane
 *       404:
 *         description: Nie znaleziono startu lub sektora
 *       403:
 *         description: Brak uprawnień
 */
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
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