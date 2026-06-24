const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const resultController = require('../controllers/result.controller');



/**
 * @swagger
 * /results:
 *   get:
 *     summary: Pobierz wszystkie wyniki
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: Lista wyników
 */
router.get('/', resultController.getAllResults);

router.get(
    '/competition/:competitionId/round/:roundId/sector/:sectorId',
    resultController.getResultsByCompetitionRoundAndSector
);


/**
 * @swagger
 * /results/round/{id}:
 *   get:
 *     summary: Pobierz wyniki dla wybranej tury
 *     tags: [Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista wyników tury
 *       404:
 *         description: Nie znaleziono tury
 */
router.get('/round/:id', resultController.getResultsByRoundId);


/**
 * @swagger
 * /results/calculate/round/{roundId}/sector/{sectorId}:
 *   get:
 *     summary: Oblicz wyniki sektora bez zapisywania do bazy
 *     tags: [Results]
 *     parameters:
 *       - in: path
 *         name: roundId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: sectorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obliczone wyniki sektora
 *       404:
 *         description: Nie znaleziono tury lub sektora
 */
router.get(
    '/calculate/round/:roundId/sector/:sectorId',
    resultController.calculateSectorResults
);


/**
 * @swagger
 * /results/generate/round/{roundId}/sector/{sectorId}:
 *   post:
 *     summary: Wygeneruj i zapisz wyniki sektora
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roundId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: sectorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Wyniki zostały wygenerowane
 *       404:
 *         description: Nie znaleziono tury lub sektora
 *       403:
 *         description: Brak uprawnień
 */
router.post(
    '/generate/round/:roundId/sector/:sectorId',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER', 'JUDGE'),
    resultController.generateSectorResults
);


/**
 * @swagger
 * /results/{id}:
 *   get:
 *     summary: Pobierz wynik po ID
 *     tags: [Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dane wyniku
 *       404:
 *         description: Nie znaleziono wyniku
 */
router.get('/:id', resultController.getResultById);


/**
 * @swagger
 * /results:
 *   post:
 *     summary: Utwórz wynik
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startId
 *             properties:
 *               startId:
 *                 type: integer
 *                 example: 1
 *               placeInSector:
 *                 type: integer
 *                 example: 1
 *               sectorPoints:
 *                 type: number
 *                 example: 1
 *               finalPoints:
 *                 type: number
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, DISQUALIFIED]
 *               notes:
 *                 type: string
 *                 example: Wynik zatwierdzony
 *     responses:
 *       201:
 *         description: Utworzono wynik
 *       404:
 *         description: Nie znaleziono startu
 *       409:
 *         description: Ten start ma już przypisany wynik
 */
router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER', 'JUDGE'),
    resultController.createResult
);



/**
 * @swagger
 * /results/{id}:
 *   put:
 *     summary: Aktualizuj wynik
 *     tags: [Results]
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
 *               placeInSector:
 *                 type: integer
 *               sectorPoints:
 *                 type: number
 *               finalPoints:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, DISQUALIFIED]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Wynik zaktualizowany
 *       404:
 *         description: Nie znaleziono wyniku
 */
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER', 'JUDGE'),
    resultController.updateResult
);


/**
 * @swagger
 * /results/{id}:
 *   delete:
 *     summary: Usuń wynik
 *     tags: [Results]
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
 *         description: Wynik usunięty
 *       404:
 *         description: Nie znaleziono wyniku
 *       403:
 *         description: Brak uprawnień
 */
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    resultController.deleteResult
);

module.exports = router;