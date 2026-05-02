let teams = [];
exports.getAllTeams = (req, res) => {
    res.json(teams);
};

exports.createTeams = (req, res) => {
    const { name, competitorIds} = req.body;

    const newTeam = {
        id: Date.now(),
        name,
        competitorIds: competitorIds || []

    };
    teams.push(newTeam);

    res.status(201).json(newTeam);
};

exports.getTeamsById = (req, res) =>{
    const id = parseInt(req.params.id);

    const team = teams.find(t => t.id === id);

    if(!team) {
        return res.status(404).json({ message: "nie znaleziono drużyny"});
    }

    res.json(team);
    };