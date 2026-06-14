const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

exports.register = async (data) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if (existingUser) {
        const error = new Error('Użytkownik z takim emailem już istnieje');
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role || 'USER'
        }
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};

exports.login = async (data) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if (!user) {
        const error = new Error('Nieprawidłowy email lub hasło');
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!isPasswordValid) {
        const error = new Error('Nieprawidłowy email lub hasło');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

exports.getMe = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    });

    if (!user) {
        const error = new Error('Nie znaleziono użytkownika');
        error.statusCode = 404;
        throw error;
    }

    return user;
};