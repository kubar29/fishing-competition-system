exports.validateIdParam = (id) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        const error = new Error('Nieprawidłowe ID');
        error.statusCode = 400;
        throw error;
    }

    return parsedId;
};

exports.validateCreateSectorDto = (body = {}) => {
    const errors = [];

    if (!body.name) {
        errors.push('Nazwa sektora jest wymagana');
    }

    if (body.roundId === undefined) {
        errors.push('ID tury jest wymagane');
    }

    if (body.roundId !== undefined && isNaN(Number(body.roundId))) {
        errors.push('ID tury musi być liczbą');
    }

    return errors;
};

exports.validateUpdateSectorDto = (body = {}) => {
    const errors = [];

    if (body.roundId !== undefined && isNaN(Number(body.roundId))) {
        errors.push('ID tury musi być liczbą');
    }

    return errors;
};

exports.mapCreateSectorDto = (body) => ({
    name: body.name,
    roundId: Number(body.roundId)
});

exports.mapUpdateSectorDto = (body) => ({
    ...(body.name !== undefined && { name: body.name }),
    ...(body.roundId !== undefined && { roundId: Number(body.roundId) })
});