const prisma = require('../prisma/client');

const findTeamOrThrow = async (teamId) => {
    const team = await prisma.team.findUnique({
        where: { id: teamId }
    });

    if (!team) {
        const error = new Error('Drużyna nie istnieje');
        error.statusCode = 404;
        throw error;
    }

    return team;
};

const findCompetitorOrThrow = async (competitorId) => {
    const competitor = await prisma.competitor.findUnique({
        where: { id: competitorId }
    });

    if (!competitor) {
        const error = new Error('Zawodnik nie istnieje');
        error.statusCode = 404;
        throw error;
    }

    return competitor;
};

exports.getTeamMembers = async (teamId) => {
    await findTeamOrThrow(teamId);

    return await prisma.teamMember.findMany({
        where: { teamId },
        include: {
            competitor: true
        }
    });
};

exports.addMember = async (teamId, data) => {
    await findTeamOrThrow(teamId);
    await findCompetitorOrThrow(data.competitorId);

    const existingMember = await prisma.teamMember.findFirst({
        where: {
            teamId,
            competitorId: data.competitorId
        }
    });

    if (existingMember) {
        const error = new Error('Zawodnik już jest w drużynie');
        error.statusCode = 409;
        throw error;
    }

    return await prisma.teamMember.create({
        data: {
            teamId,
            competitorId: data.competitorId
        },
        include: {
            competitor: true
        }
    });
};

exports.removeMember = async (teamId, competitorId) => {
    await findTeamOrThrow(teamId);

    const deleted = await prisma.teamMember.deleteMany({
        where: {
            teamId,
            competitorId
        }
    });

    if (deleted.count === 0) {
        const error = new Error('Zawodnik nie należy do tej drużyny');
        error.statusCode = 404;
        throw error;
    }

    return {
        message: 'Usunięto zawodnika z drużyny'
    };
};