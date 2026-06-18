const prisma = require('../prisma/client');

const teamInclude = {
    competition: true,
    members: {
        include: {
            competitor: true
        }
    }
};

const findTeamOrThrow = async (id) => {
    const team = await prisma.team.findUnique({
        where: { id },
        include: teamInclude
    });

    if (!team) {
        const error = new Error('Nie znaleziono drużyny');
        error.statusCode = 404;
        throw error;
    }

    return team;
};

const findCompetitionOrThrow = async (competitionId) => {
    const competition = await prisma.competition.findUnique({
        where: { id: competitionId }
    });

    if (!competition) {
        const error = new Error('Nie znaleziono zawodów');
        error.statusCode = 404;
        throw error;
    }

    return competition;
};

exports.getAllTeams = async () => {
    return await prisma.team.findMany({
        include: teamInclude
    });
};

exports.getTeamById = async (id) => {
    return await findTeamOrThrow(id);
};

exports.createTeam = async (data) => {
    await findCompetitionOrThrow(data.competitionId);

    return await prisma.team.create({
        data
    });
};

exports.updateTeam = async (id, data) => {
    await findTeamOrThrow(id);

    if (data.competitionId !== undefined) {
        await findCompetitionOrThrow(data.competitionId);
    }

    return await prisma.team.update({
        where: { id },
        data,
        include: teamInclude
    });
};

exports.deleteTeam = async (id) => {
    await findTeamOrThrow(id);

    await prisma.team.delete({
        where: { id }
    });

    return {
        message: 'Usunięto drużynę'
    };
};