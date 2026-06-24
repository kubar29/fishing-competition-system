const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const teamController = require('../controllers/team.controller');
const teamMemberController = require('../controllers/teamMember.controller');

// team


/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Pobierz wszystkie drużyny
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Lista drużyn
 */
router.get('/', teamController.getAllTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Pobierz drużynę po ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dane drużyny
 *       404:
 *         description: Nie znaleziono drużyny
 */
router.get('/:id', teamController.getTeamsById);


/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Utwórz drużynę
 *     tags: [Teams]
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
 *               - competitionId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sensas team
 *               competitionId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Utworzono drużynę
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
    teamController.createTeams
);


/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Aktualizuj drużynę
 *     tags: [Teams]
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
 *               competitionId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Drużyna zaktualizowana
 *       404:
 *         description: Nie znaleziono drużyny
 *       403:
 *         description: Brak uprawnień
 */
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    teamController.updateTeam
);


/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Usuń drużynę
 *     tags: [Teams]
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
 *         description: Drużyna usunięta
 *       404:
 *         description: Nie znaleziono drużyny
 *       403:
 *         description: Brak uprawnień
 */
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN'),
    teamController.deleteTeam
);

// teamMember

/**
 * @swagger
 * /teams/{teamId}/members:
 *   get:
 *     summary: Pobierz skład drużyny
 *     tags: [Team Members]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista członków drużyny
 *       404:
 *         description: Nie znaleziono drużyny
 */
router.get('/:teamId/members', teamMemberController.getTeamMembers);


/**
 * @swagger
 * /teams/{teamId}/members:
 *   post:
 *     summary: Dodaj zawodnika do drużyny
 *     tags: [Team Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
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
 *               - competitorId
 *             properties:
 *               competitorId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Dodano zawodnika do drużyny
 *       404:
 *         description: Nie znaleziono drużyny lub zawodnika
 *       409:
 *         description: Zawodnik już należy do drużyny
 */
router.post(
    '/:teamId/members',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    teamMemberController.addMember
);


/**
 * @swagger
 * /teams/{teamId}/members/{competitorId}:
 *   delete:
 *     summary: Usuń zawodnika z drużyny
 *     tags: [Team Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: competitorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usunięto zawodnika z drużyny
 *       404:
 *         description: Nie znaleziono relacji
 */
router.delete(
    '/:teamId/members/:competitorId',
    authMiddleware,
    roleMiddleware('ADMIN', 'ORGANIZER'),
    teamMemberController.removeMember
);

module.exports = router;