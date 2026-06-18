const allowedStatuses = ['PENDING', 'CONFIRMED', 'DISQUALIFIED'];

exports.validateCreateResultDto = (body = {}) => {
    const errors = [];

    if (body.startId === undefined) {
        errors.push('startId jest wymagane');
    }

    if (body.startId !== undefined && isNaN(Number(body.startId))) {
        errors.push('startId musi być liczbą');
    }

    if (body.placeInSector !== undefined && Number(body.placeInSector) < 1) {
        errors.push('Miejsce w sektorze musi być większe od 0');
    }

    if (body.sectorPoints !== undefined && Number(body.sectorPoints) < 0) {
        errors.push('Punkty sektorowe nie mogą być ujemne');
    }

    if (body.finalPoints !== undefined && Number(body.finalPoints) < 0) {
        errors.push('Punkty końcowe nie mogą być ujemne');
    }

    if (
        body.status !== undefined &&
        !allowedStatuses.includes(body.status)
    ) {
        errors.push('Nieprawidłowy status wyniku');
    }

    return errors;
};

exports.validateUpdateResultDto = (body = {}) => {
    const errors = [];

    if (body.placeInSector !== undefined && Number(body.placeInSector) < 1) {
        errors.push('Miejsce w sektorze musi być większe od 0');
    }

    if (body.sectorPoints !== undefined && Number(body.sectorPoints) < 0) {
        errors.push('Punkty sektorowe nie mogą być ujemne');
    }

    if (body.finalPoints !== undefined && Number(body.finalPoints) < 0) {
        errors.push('Punkty końcowe nie mogą być ujemne');
    }

    if (
        body.status !== undefined &&
        !allowedStatuses.includes(body.status)
    ) {
        errors.push('Nieprawidłowy status wyniku');
    }

    return errors;
};

exports.mapCreateResultDto = (body) => {
    return {
        startId: Number(body.startId),
        ...(body.placeInSector !== undefined && {
            placeInSector: Number(body.placeInSector)
        }),
        ...(body.sectorPoints !== undefined && {
            sectorPoints: Number(body.sectorPoints)
        }),
        ...(body.finalPoints !== undefined && {
            finalPoints: Number(body.finalPoints)
        }),
        ...(body.status !== undefined && {
            status: body.status
        }),
        ...(body.notes !== undefined && {
            notes: body.notes
        })
    };
};

exports.mapUpdateResultDto = (body) => {
    return {
        ...(body.placeInSector !== undefined && {
            placeInSector: Number(body.placeInSector)
        }),
        ...(body.sectorPoints !== undefined && {
            sectorPoints: Number(body.sectorPoints)
        }),
        ...(body.finalPoints !== undefined && {
            finalPoints: Number(body.finalPoints)
        }),
        ...(body.status !== undefined && {
            status: body.status
        }),
        ...(body.notes !== undefined && {
            notes: body.notes
        })
    };
};