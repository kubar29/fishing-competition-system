exports.validateCreateCompetitionDto = (body = {}) => {
    const errors = [];

    if (!body.name) {
        errors.push('Nazwa zawodów jest wymagana');
    }

    if (!body.date) {
        errors.push('Data zawodów jest wymagana');
    }

    if (body.date !== undefined && isNaN(new Date(body.date).getTime())) {
        errors.push('Data zawodów ma nieprawidłowy format');
    }

    return errors;
};

exports.validateUpdateCompetitionDto = (body = {}) => {
    const errors = [];

    if (body.date !== undefined && isNaN(new Date(body.date).getTime())) {
        errors.push('Data zawodów ma nieprawidłowy format');
    }

    return errors;
};

exports.mapCreateCompetitionDto = (body) => {
    return {
        name: body.name,
        date: new Date(body.date)
    };
};

exports.mapUpdateCompetitionDto = (body) => {
    return {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.date !== undefined && { date: new Date(body.date) })
    };
};