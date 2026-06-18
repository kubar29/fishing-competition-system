const teamMemberService = require('../services/teamMember.service');

const {
    validateAddMemberDto,
    mapAddMemberDto
} = require('../dto/teamMember.dto');

exports.getTeamMembers = async (req, res) => {
    try {
        const teamId = Number(req.params.teamId);

        const members = await teamMemberService.getTeamMembers(teamId);

        res.json(members);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd pobierania składu drużyny'
        });
    }
};

exports.addMember = async (req, res) => {
    try {
        const teamId = Number(req.params.teamId);

        const errors = validateAddMemberDto(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Błędne dane wejściowe',
                errors
            });
        }

        const data = mapAddMemberDto(req.body);

        const member = await teamMemberService.addMember(teamId, data);

        res.status(201).json(member);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd dodawania zawodnika do drużyny'
        });
    }
};

exports.removeMember = async (req, res) => {
    try {
        const teamId = Number(req.params.teamId);
        const competitorId = Number(req.params.competitorId);

        const result = await teamMemberService.removeMember(
            teamId,
            competitorId
        );

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.statusCode
                ? error.message
                : 'Błąd usuwania zawodnika z drużyny'
        });
    }
};