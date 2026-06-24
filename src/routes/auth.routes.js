const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');



/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Rejestracja użytkownika
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: Admin123!
 *               role:
 *                 type: string
 *                 enum: [ADMIN, ORGANIZER, JUDGE, USER]
 *                 example: ADMIN
 *     responses:
 *       201:
 *         description: Użytkownik zarejestrowany
 *       400:
 *         description: Błędne dane wejściowe
 *       409:
 *         description: Użytkownik z takim emailem już istnieje
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logowanie użytkownika
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: Admin123!
 *     responses:
 *       200:
 *         description: Zalogowano użytkownika
 *       400:
 *         description: Błędne dane wejściowe
 *       401:
 *         description: Nieprawidłowy email lub hasło
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Pobranie danych zalogowanego użytkownika
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dane aktualnie zalogowanego użytkownika
 *       401:
 *         description: Brak tokenu lub nieprawidłowy token
 */
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;