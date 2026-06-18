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