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

    if (body.competitionEntryId === undefined) {
        errors.push('ID zgłoszenia zawodnika jest wymagane');
    }

    if (body.competitorId === undefined) {
        errors.push('ID zawodnika jest wymagane');
    }

    if (body.roundId === undefined) {
        errors.push('ID tury jest wymagane');
    }

    if (body.sectorId === undefined) {
        errors.push('ID sektora jest wymagane');
    }

    if (body.pegNumber === undefined) {
        errors.push('Numer stanowiska jest wymagany');
    }

    if (
        body.competitionEntryId !== undefined &&
        (!Number.isInteger(Number(body.competitionEntryId)) ||
            Number(body.competitionEntryId) <= 0)
    ) {
        errors.push('ID zgłoszenia zawodnika musi być dodatnią liczbą całkowitą');
    }

    if (
        body.competitorId !== undefined &&
        (!Number.isInteger(Number(body.competitorId)) ||
            Number(body.competitorId) <= 0)
    ) {
        errors.push('ID zawodnika musi być dodatnią liczbą całkowitą');
    }

    if (
        body.roundId !== undefined &&
        (!Number.isInteger(Number(body.roundId)) ||
            Number(body.roundId) <= 0)
    ) {
        errors.push('ID tury musi być dodatnią liczbą całkowitą');
    }

    if (
        body.sectorId !== undefined &&
        (!Number.isInteger(Number(body.sectorId)) ||
            Number(body.sectorId) <= 0)
    ) {
        errors.push('ID sektora musi być dodatnią liczbą całkowitą');
    }

    if (
        body.pegNumber !== undefined &&
        (!Number.isInteger(Number(body.pegNumber)) ||
            Number(body.pegNumber) <= 0)
    ) {
        errors.push('Numer stanowiska musi być dodatnią liczbą całkowitą');
    }

    return errors;
};


exports.validateUpdateStartDto = (body = {}) => {
    const errors = [];

    if (
        body.sectorId !== undefined &&
        (!Number.isInteger(Number(body.sectorId)) ||
            Number(body.sectorId) <= 0)
    ) {
        errors.push('ID sektora musi być dodatnią liczbą całkowitą');
    }

    if (
        body.pegNumber !== undefined &&
        (!Number.isInteger(Number(body.pegNumber)) ||
            Number(body.pegNumber) <= 0)
    ) {
        errors.push('Numer stanowiska musi być dodatnią liczbą całkowitą');
    }

    return errors;
};


exports.validateWeighStartDto = (body = {}) => {
    const weight = Number(body.weight);

    const penaltyPoints =
        body.penaltyPoints !== undefined
            ? Number(body.penaltyPoints)
            : 0;

    if (
        body.weight === undefined ||
        !Number.isInteger(weight) ||
        weight < 0
    ) {
        const error = new Error(
            'Waga jest wymagana i musi być liczbą całkowitą większą lub równą 0'
        );
        error.statusCode = 400;
        throw error;
    }

    if (
        !Number.isInteger(penaltyPoints) ||
        penaltyPoints < 0
    ) {
        const error = new Error(
            'Punkty karne muszą być liczbą całkowitą większą lub równą 0'
        );
        error.statusCode = 400;
        throw error;
    }

    return {
        weight,
        penaltyPoints
    };
};


exports.mapCreateStartDto = (body) => ({
    competitionEntryId: Number(body.competitionEntryId),
    competitorId: Number(body.competitorId),
    roundId: Number(body.roundId),
    sectorId: Number(body.sectorId),
    pegNumber: Number(body.pegNumber)
});


exports.mapUpdateStartDto = (body) => ({
    ...(body.sectorId !== undefined && {
        sectorId: Number(body.sectorId)
    }),

    ...(body.pegNumber !== undefined && {
        pegNumber: Number(body.pegNumber)
    })
});