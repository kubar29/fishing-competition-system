const prisma = require('../prisma/client');

const sectorInclude = {
    round: true,
    starts: true
};

const findSectorOrThrow = async (id) => {
    const sector = await prisma.sector.findUnique({
        where: { id },
        include: sectorInclude
    });

    if (!sector) {
        const error = new Error('Nie znaleziono sektora');
        error.statusCode = 404;
        throw error;
    }

    return sector;
};

const findRoundOrThrow = async (roundId) => {
    const round = await prisma.round.findUnique({
        where: { id: roundId }
    });

    if (!round) {
        const error = new Error('Nie znaleziono tury');
        error.statusCode = 404;
        throw error;
    }

    return round;
};

exports.getAllSectors = async () => {
    return await prisma.sector.findMany({
        include: sectorInclude
    });
};

exports.getSectorById = async (id) => {
    return await findSectorOrThrow(id);
};

exports.createSector = async (data) => {
    await findRoundOrThrow(data.roundId);

    return await prisma.sector.create({
        data,
        include: sectorInclude
    });
};

exports.updateSector = async (id, data) => {
    await findSectorOrThrow(id);

    if (data.roundId !== undefined) {
        await findRoundOrThrow(data.roundId);
    }

    return await prisma.sector.update({
        where: { id },
        data,
        include: sectorInclude
    });
};

exports.deleteSector = async (id) => {
    await findSectorOrThrow(id);

    await prisma.sector.delete({
        where: { id }
    });

    return {
        message: 'Usunięto sektor'
    };
};