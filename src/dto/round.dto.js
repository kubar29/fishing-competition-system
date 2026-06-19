exports.validateIdParam = (id) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        const error = new Error('Nieprawidłowe ID');
        error.statusCode = 400;
        throw error;
    }

    return parsedId;
};

exports.validateCreateRoundDto = (body = {}) => {
    const errors = [];

    if (!body.name) {
        errors.push('Nazwa tury jest wymagana');
    }

    if (body.number === undefined) {
        errors.push('Numer tury jest wymagany');
    }

    if (body.competitionId === undefined) {
        errors.push('ID zawodów jest wymagane');
    }

    if (body.number !== undefined && isNaN(Number(body.number))) {
        errors.push('Numer tury musi być liczbą');
    }

    if (body.competitionId !== undefined && isNaN(Number(body.competitionId))) {
        errors.push('ID zawodów musi być liczbą');
    }

    return errors;
};

exports.validateUpdateRoundDto = (body = {}) => {
    const errors = [];

    if (body.number !== undefined && isNaN(Number(body.number))) {
        errors.push('Numer tury musi być liczbą');
    }

    if (body.competitionId !== undefined && isNaN(Number(body.competitionId))) {
        errors.push('ID zawodów musi być liczbą');
    }

    return errors;
};

exports.mapCreateRoundDto = (body) => ({
    name: body.name,
    number: Number(body.number),
    competitionId: Number(body.competitionId)
});

exports.mapUpdateRoundDto = (body) => ({
    ...(body.name !== undefined && { name: body.name }),
    ...(body.number !== undefined && { number: Number(body.number) }),
    ...(body.competitionId !== undefined && { competitionId: Number(body.competitionId) })
});