exports.validateIdParam = (id) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        const error = new Error('Nieprawidłowe ID');
        error.statusCode = 400;
        throw error;
    }

    return parsedId;
};

exports.validateAddMemberDto = (body = {}) => {
    const errors = [];

    if (body.competitorId === undefined) {
        errors.push('competitorId jest wymagane');
    }

    if (
        body.competitorId !== undefined &&
        isNaN(Number(body.competitorId))
    ) {
        errors.push('competitorId musi być liczbą');
    }

    return errors;
};

exports.mapAddMemberDto = (body) => {
    return {
        competitorId: Number(body.competitorId)
    };
};