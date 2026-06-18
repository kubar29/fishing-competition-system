const teamService = require('../services/team.service');

const {
    validateCreateTeamDto,
    validateUpdateTeamDto,
    mapCreateTeamDto,
    mapUpdateTeamDto
} = require('../dto/team.dto');

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await teamService.getAllTeams();

        res.json(teams);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Błąd pobierania drużyn'
        });
    }
};

exports.getTeamsById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const team = await teamService.getTeamById(id);

        res.json(team);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd pobierania drużyny'
        });
    }
};

exports.createTeams = async (req, res) => {
    try {
        const errors = validateCreateTeamDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapCreateTeamDto(req.body);

        const team = await teamService.createTeam(data);

        res.status(201).json(team);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd tworzenia drużyny'
        });
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const errors = validateUpdateTeamDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapUpdateTeamDto(req.body);

        const updatedTeam = await teamService.updateTeam(id, data);

        res.json(updatedTeam);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd aktualizacji drużyny'
        });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await teamService.deleteTeam(id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd usuwania drużyny'
        });
    }
};