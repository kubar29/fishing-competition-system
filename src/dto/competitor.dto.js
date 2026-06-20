const allowedCategories = ['SENIOR', 'WOMAN', 'U25'];

exports.validateIdParam = (id) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        const error = new Error('Nieprawidłowe ID');
        error.statusCode = 400;
        throw error;
    }

    return parsedId;
};

exports.validateCreateCompetitorDto = (body = {}) => {
    const errors = [];

    if (!body.name) {
        errors.push('Imię zawodnika jest wymagane');
    }

    if (!body.surname) {
        errors.push('Nazwisko zawodnika jest wymagane');
    }

    if (
        body.category !== undefined &&
        !allowedCategories.includes(body.category)
    ) {
        errors.push('Nieprawidłowa kategoria zawodnika');
    }

    return errors;
};

exports.validateUpdateCompetitorDto = (body = {}) => {
    const errors = [];

    if (
        body.category !== undefined &&
        !allowedCategories.includes(body.category)
    ) {
        errors.push('Nieprawidłowa kategoria zawodnika');
    }

    return errors;
};

exports.mapCreateCompetitorDto = (body) => {
    return {
        name: body.name,
        surname: body.surname,
        ...(body.category !== undefined && {
            category: body.category
        })
    };
};

exports.mapUpdateCompetitorDto = (body) => {
    return {
        ...(body.name !== undefined && {
            name: body.name
        }),
        ...(body.surname !== undefined && {
            surname: body.surname
        }),
        ...(body.category !== undefined && {
            category: body.category
        })
    };
};