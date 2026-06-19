exports.validateIdParam = (id) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        const error = new Error('Nieprawidłowe ID');
        error.statusCode = 400;
        throw error;
    }

    return parsedId;
};

exports.validateCreateStartDto = (body = {}) => {
    const errors = [];

    if (body.competitorId === undefined) {
        errors.push('ID zawodnika jest wymagane');
    }

    if (body.roundId === undefined) {
        errors.push('ID tury jest wymagane');
    }

    if (body.sectorId === undefined) {
        errors.push('ID sektora jest wymagane');
    }

    if (body.competitorId !== undefined && !Number.isInteger(Number(body.competitorId))) {
        errors.push('ID zawodnika musi być liczbą całkowitą');
    }

    if (body.roundId !== undefined && !Number.isInteger(Number(body.roundId))) {
        errors.push('ID tury musi być liczbą całkowitą');
    }

    if (body.sectorId !== undefined && !Number.isInteger(Number(body.sectorId))) {
        errors.push('ID sektora musi być liczbą całkowitą');
    }

    if (body.position !== undefined && !Number.isInteger(Number(body.position))) {
        errors.push('Pozycja musi być liczbą całkowitą');
    }

    if (body.weight !== undefined && !Number.isInteger(Number(body.weight))) {
        errors.push('Waga musi być liczbą całkowitą');
    }

    if (body.penaltyPoints !== undefined && !Number.isInteger(Number(body.penaltyPoints))) {
        errors.push('Punkty karne muszą być liczbą całkowitą');
    }

    if (body.sectorPoints !== undefined && isNaN(Number(body.sectorPoints))) {
        errors.push('Punkty sektorowe muszą być liczbą');
    }

    return errors;
};

exports.validateUpdateStartDto = (body = {}) => {
    const errors = [];

    if (body.sectorId !== undefined && !Number.isInteger(Number(body.sectorId))) {
        errors.push('ID sektora musi być liczbą całkowitą');
    }

    if (body.position !== undefined && !Number.isInteger(Number(body.position))) {
        errors.push('Pozycja musi być liczbą całkowitą');
    }

    if (body.weight !== undefined && !Number.isInteger(Number(body.weight))) {
        errors.push('Waga musi być liczbą całkowitą');
    }

    if (body.penaltyPoints !== undefined && !Number.isInteger(Number(body.penaltyPoints))) {
        errors.push('Punkty karne muszą być liczbą całkowitą');
    }

    if (body.sectorPoints !== undefined && isNaN(Number(body.sectorPoints))) {
        errors.push('Punkty sektorowe muszą być liczbą');
    }

    return errors;
};

exports.mapCreateStartDto = (body) => ({
    competitorId: Number(body.competitorId),
    roundId: Number(body.roundId),
    sectorId: Number(body.sectorId),
    ...(body.position !== undefined && { position: Number(body.position) }),
    ...(body.weight !== undefined && { weight: Number(body.weight) }),
    ...(body.penaltyPoints !== undefined && { penaltyPoints: Number(body.penaltyPoints) }),
    ...(body.sectorPoints !== undefined && { sectorPoints: Number(body.sectorPoints) }),
    ...(body.subSector !== undefined && { subSector: body.subSector })
});

exports.mapUpdateStartDto = (body) => ({
    ...(body.sectorId !== undefined && { sectorId: Number(body.sectorId) }),
    ...(body.position !== undefined && { position: Number(body.position) }),
    ...(body.weight !== undefined && { weight: Number(body.weight) }),
    ...(body.penaltyPoints !== undefined && { penaltyPoints: Number(body.penaltyPoints) }),
    ...(body.sectorPoints !== undefined && { sectorPoints: Number(body.sectorPoints) }),
    ...(body.subSector !== undefined && { subSector: body.subSector })
});