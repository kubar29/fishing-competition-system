let competitions = [];

exports.getAllCompetitions = (reg,res) => {
    res.json(competitions)
}

exports.createCompetition =(req, res) => {
    const {name, date} = req.body;

    const newCompetition = {
        id: Date.now(),
        name,
        date,
    };

    competitions.push(newCompetition);

    res.status(201).json(newCompetition)
};