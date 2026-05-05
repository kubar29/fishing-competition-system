

exports.calculateSector = async (roundId, sector) => {
  const sectorStarts = await prisma.start.findMany({
    where: {
      roundId: roundId,
      sector: sector
    }
  });

    // sortowanie malejąco po wadze
    sectorStarts.sort((a, b) => b.weight - a.weight);

    let results = [];
    let i = 0;

    while (i < sectorStarts.length) {
        let currentWeight = sectorStarts[i].weight;

        // grupa remisów
        let group = sectorStarts.filter(
            s => s.weight === currentWeight
        );

        let startIndex = i;
        let endIndex = i + group.length - 1;

        // średnia miejsc
        let avgPlace = (startIndex + 1 + endIndex + 1) / 2;

        group.forEach(s => {
            results.push({
                ...s,
                sectorPoints: avgPlace + s.penaltyPoints
            });
        });

        i += group.length;
    }

    return results;
};

const prisma = require('../prisma/client');

exports.testStarts = async () => {
    return await prisma.start.findMany();
};