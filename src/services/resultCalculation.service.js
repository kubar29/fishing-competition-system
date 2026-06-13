const prisma = require('../prisma/client');

exports.calculateSectorResults = async (roundId, sectorId) => {
    const sector = await prisma.sector.findUnique({
        where: { id: sectorId }
    });

    if (!sector) {
        const error = new Error('Nie znaleziono sektora');
        error.statusCode = 404;
        throw error;
    }

    if (sector.roundId !== roundId) {
        const error = new Error('Sektor nie należy do wybranej tury');
        error.statusCode = 400;
        throw error;
    }

    const starts = await prisma.start.findMany({
        where: {
            roundId,
            sectorId
        },
        include: {
            competitor: true,
            sector: true,
            result: true
        }
    });

    const sortedStarts = starts.sort((a, b) => b.weight - a.weight);

    const calculatedResults = [];

    let i = 0;

    while (i < sortedStarts.length) {
        const currentWeight = sortedStarts[i].weight;
        const tiedGroup = [];

        while (
            i < sortedStarts.length &&
            sortedStarts[i].weight === currentWeight
        ) {
            tiedGroup.push(sortedStarts[i]);
            i++;
        }

        const startPlace = calculatedResults.length + 1;
        const endPlace = calculatedResults.length + tiedGroup.length;
        const averagePlace = (startPlace + endPlace) / 2;

        tiedGroup.forEach((start) => {
            const points = averagePlace + start.penaltyPoints;

            calculatedResults.push({
                startId: start.id,
                competitorId: start.competitorId,
                competitor: start.competitor,
                sectorId: start.sectorId,
                sector: start.sector,
                weight: start.weight,
                penaltyPoints: start.penaltyPoints,
                placeInSector: averagePlace,
                sectorPoints: points,
                finalPoints: points
            });
        });
    }

    return calculatedResults;
};

exports.generateSectorResults = async (roundId, sectorId) => {
    const calculatedResults = await exports.calculateSectorResults(roundId, sectorId);

    const savedResults = [];

    for (const result of calculatedResults) {
        const savedResult = await prisma.result.upsert({
            where: {
                startId: result.startId
            },
            update: {
                placeInSector: result.placeInSector,
                sectorPoints: result.sectorPoints,
                finalPoints: result.finalPoints,
                status: 'CONFIRMED'
            },
            create: {
                startId: result.startId,
                placeInSector: result.placeInSector,
                sectorPoints: result.sectorPoints,
                finalPoints: result.finalPoints,
                status: 'CONFIRMED'
            }
        });

        savedResults.push(savedResult);
    }

    return savedResults;
};