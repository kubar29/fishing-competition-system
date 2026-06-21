const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const roundController = require('../controllers/round.controller');


/**
 * @swagger
 * /rounds:
 *   get:
 *     summary: Pobierz wszystkie tury
 *     tags: [Rounds]
 *     responses:
 *       200:
 *         description: Lista tur
 */
router.get('/', roundController.getAllRounds);


/**
 * @swagger
 * /rounds/{id}:
 *   get:
 *     summary: Pobierz turę po ID
 *     tags: [Rounds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dane tury
 *       404:
 *         description: Nie znaleziono tury
 */
router.get('/:id', roundController.getRoundById);


/**
 * @swagger
 * /rounds:
 *   post:
 *     summary: Utwórz turę
 *     tags: [Rounds]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - number
 *               - competitionId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tura 1
 *               number:
 *                 type: integer
 *                 example: 1
 *               competitionId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Utworzono turę
 *       400:
 *         description: Błędne dane wejściowe
 *       404:
 *         description: Nie znaleziono zawodów
 *       403:
 *         description: Brak uprawnień
 */
router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    roundController.createRound
);


/**
 * @swagger
 * /rounds/{id}:
 *   put:
 *     summary: Aktualizuj turę
 *     tags: [Rounds]
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
 *               name:
 *                 type: string
 *               number:
 *                 type: integer
 *               competitionId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tura zaktualizowana
 *       404:
 *         description: Nie znaleziono tury
 *       403:
 *         description: Brak uprawnień
 */
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    roundController.updateRound
);


/**
 * @swagger
 * /rounds/{id}:
 *   delete:
 *     summary: Usuń turę
 *     tags: [Rounds]
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
 *         description: Tura usunięta
 *       404:
 *         description: Nie znaleziono tury
 *       403:
 *         description: Brak uprawnień
 */
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    roundController.deleteRound
);

module.exports = router;