const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Brak tokenu autoryzacyjnego'
        });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Nieprawidłowy format tokenu'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        console.error('JWT verify error:', error.message);

        return res.status(401).json({
            message: 'Nieprawidłowy lub wygasły token'
        });
    }
};