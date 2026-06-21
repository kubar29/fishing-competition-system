const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const competitionController = require('../controllers/competition.controller')


/**
 * @swagger
 * /competitions:
 *   get:
 *     summary: Pobierz wszystkie zawody
 *     tags: [Competitions]
 *     responses:
 *       200:
 *         description: Lista zawodów
 */
router.get('/', competitionController.getAllCompetitions);

/**
 * @swagger
 * /competitions/{id}:
 *   get:
 *     summary: Pobierz zawody po ID
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Szczegóły zawodów
 *       404:
 *         description: Nie znaleziono zawodów
 */
router.get('/:id', competitionController.getCompetitionById);



/**
 * @swagger
 * /competitions:
 *   post:
 *     summary: Utwórz zawody
 *     tags: [Competitions]
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
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *                 example: Grand Prix Polski
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-15
 *     responses:
 *       201:
 *         description: Utworzono zawody
 *       400:
 *         description: Błędne dane wejściowe
 *       401:
 *         description: Brak autoryzacji
 *       403:
 *         description: Brak uprawnień
 */
router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    competitionController.createCompetition
);

/**
 * @swagger
 * /competitions/{id}:
 *   put:
 *     summary: Aktualizuj zawody
 *     tags: [Competitions]
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
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Zawody zaktualizowane
 *       404:
 *         description: Nie znaleziono zawodów
 *       403:
 *         description: Brak uprawnień
 */
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    competitionController.updateCompetition
);


/**
 * @swagger
 * /competitions/{id}:
 *   delete:
 *     summary: Usuń zawody
 *     tags: [Competitions]
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
 *         description: Zawody usunięte
 *       404:
 *         description: Nie znaleziono zawodów
 *       403:
 *         description: Brak uprawnień
 */
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN'),
    competitionController.deleteCompetition
);

module.exports = router;