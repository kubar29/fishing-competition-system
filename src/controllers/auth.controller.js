const authService = require('../services/auth.service');

const {
    validateRegisterDto,
    validateLoginDto,
    mapRegisterDto,
    mapLoginDto
} = require('../dto/auth.dto');

exports.register = async (req, res) => {
    try {
        const errors = validateRegisterDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapRegisterDto(req.body);

        const user = await authService.register(data);

        res.status(201).json(user);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd rejestracji użytkownika'
        });
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validateLoginDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapLoginDto(req.body);

        const result = await authService.login(data);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd logowania'
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await authService.getMe(req.user.userId);

        res.json(user);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd pobierania danych użytkownika'
        });
    }
};