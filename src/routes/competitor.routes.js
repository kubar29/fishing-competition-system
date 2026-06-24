const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const competitorController = require('../controllers/competitor.controller');



/**
 * @swagger
 * /competitors:
 *   get:
 *     summary: Pobierz wszystkich zawodników
 *     tags: [Competitors]
 *     responses:
 *       200:
 *         description: Lista zawodników
 */
router.get('/', competitorController.getAllCompetitors);
/**
 * @swagger
 * /competitors/{id}:
 *   get:
 *     summary: Pobierz zawodnika po ID
 *     tags: [Competitors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dane zawodnika
 *       404:
 *         description: Nie znaleziono zawodnika
 */
router.get('/:id', competitorController.getCompetitorById);


/**
 * @swagger
 * /competitors:
 *   post:
 *     summary: Utwórz zawodnika
 *     tags: [Competitors]
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
 *               - surname
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jan
 *               surname:
 *                 type: string
 *                 example: Kowalski
 *               category:
 *                 type: string
 *                 enum: [SENIOR, WOMAN, U25]
 *                 example: SENIOR
 *     responses:
 *       201:
 *         description: Utworzono zawodnika
 *       400:
 *         description: Błędne dane wejściowe
 *       403:
 *         description: Brak uprawnień
 */
router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    competitorController.createCompetitor
);


/**
 * @swagger
 * /competitors/{id}:
 *   put:
 *     summary: Aktualizuj zawodnika
 *     tags: [Competitors]
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
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [SENIOR, WOMAN, U25]
 *     responses:
 *       200:
 *         description: Zawodnik zaktualizowany
 *       404:
 *         description: Nie znaleziono zawodnika
 *       403:
 *         description: Brak uprawnień
 */
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    competitorController.updateCompetitor
);



/**
 * @swagger
 * /competitors/{id}:
 *   delete:
 *     summary: Usuń zawodnika
 *     tags: [Competitors]
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
 *         description: Zawodnik usunięty
 *       404:
 *         description: Nie znaleziono zawodnika
 *       403:
 *         description: Brak uprawnień
 */
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN'),
    competitorController.deleteCompetitor
);

module.exports = router;