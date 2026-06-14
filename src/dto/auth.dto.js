const allowedRoles = ['ADMIN', 'ORGANIZER', 'JUDGE'];

exports.validateRegisterDto = (body) => {
    const errors = [];

    if (!body.name) {
        errors.push('Imię jest wymagane');
    }

    if (!body.email) {
        errors.push('Email jest wymagany');
    }

    if (!body.password) {
        errors.push('Hasło jest wymagane');
    }

    if (body.password && body.password.length < 6) {
        errors.push('Hasło musi mieć co najmniej 6 znaków');
    }

    if (
        body.role !== undefined &&
        !allowedRoles.includes(body.role)
    ) {
        errors.push('Nieprawidłowa rola użytkownika');
    }

    return errors;
};

exports.validateLoginDto = (body) => {
    const errors = [];

    if (!body.email) {
        errors.push('Email jest wymagany');
    }

    if (!body.password) {
        errors.push('Hasło jest wymagane');
    }

    return errors;
};

exports.mapRegisterDto = (body) => {
    return {
        name: body.name,
        email: body.email,
        password: body.password,
        ...(body.role !== undefined && { role: body.role })
    };
};

exports.mapLoginDto = (body) => {
    return {
        email: body.email,
        password: body.password
    };
};