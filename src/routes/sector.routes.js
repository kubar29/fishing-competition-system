const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const sectorController = require('../controllers/sector.controller');



/**
 * @swagger
 * /sectors:
 *   get:
 *     summary: Pobierz wszystkie sektory
 *     tags: [Sectors]
 *     responses:
 *       200:
 *         description: Lista sektorów
 */
router.get('/', sectorController.getAllSectors);

/**
 * @swagger
 * /sectors/{id}:
 *   get:
 *     summary: Pobierz sektor po ID
 *     tags: [Sectors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dane sektora
 *       404:
 *         description: Nie znaleziono sektora
 */
router.get('/:id', sectorController.getSectorById);


/**
 * @swagger
 * /sectors:
 *   post:
 *     summary: Utwórz sektor
 *     tags: [Sectors]
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
 *               - roundId
 *             properties:
 *               name:
 *                 type: string
 *                 example: A
 *               roundId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Utworzono sektor
 *       400:
 *         description: Błędne dane wejściowe
 *       404:
 *         description: Nie znaleziono tury
 *       403:
 *         description: Brak uprawnień
 */
router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    sectorController.createSector
);


/**
 * @swagger
 * /sectors/{id}:
 *   put:
 *     summary: Aktualizuj sektor
 *     tags: [Sectors]
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
 *               roundId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sektor zaktualizowany
 *       404:
 *         description: Nie znaleziono sektora
 *       403:
 *         description: Brak uprawnień
 */
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    sectorController.updateSector
);


/**
 * @swagger
 * /sectors/{id}:
 *   delete:
 *     summary: Usuń sektor
 *     tags: [Sectors]
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
 *         description: Sektor usunięty
 *       404:
 *         description: Nie znaleziono sektora
 *       403:
 *         description: Brak uprawnień
 */
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    sectorController.deleteSector
);

module.exports = router;