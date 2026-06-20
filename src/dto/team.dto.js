exports.validateIdParam = (id) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        const error = new Error('Nieprawidłowe ID');
        error.statusCode = 400;
        throw error;
    }

    return parsedId;
};

exports.validateCreateTeamDto = (body = {}) => {
    const errors = [];

    if (!body.name) {
        errors.push('Nazwa drużyny jest wymagana');
    }

    if (body.competitionId === undefined) {
        errors.push('competitionId jest wymagane');
    }

    if (
        body.competitionId !== undefined &&
        isNaN(Number(body.competitionId))
    ) {
        errors.push('competitionId musi być liczbą');
    }

    return errors;
};

exports.validateUpdateTeamDto = (body = {}) => {
    const errors = [];

    if (
        body.competitionId !== undefined &&
        isNaN(Number(body.competitionId))
    ) {
        errors.push('competitionId musi być liczbą');
    }

    return errors;
};

exports.mapCreateTeamDto = (body) => {
    return {
        name: body.name,
        competitionId: Number(body.competitionId)
    };
};

exports.mapUpdateTeamDto = (body) => {
    return {
        ...(body.name !== undefined && {
            name: body.name
        }),
        ...(body.competitionId !== undefined && {
            competitionId: Number(body.competitionId)
        })
    };
};