const { json } = require("express");

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

exports.getCompetitionById = (req, res) => {
    const id = parseInt(req.params.id);

    const competition = competitions.find(c => c.id === id);

    if(!competition){
        return res.status(404).json({message: "Nie znaleziono zawodów"});
    }

    res.json(competition)
};

exports.deleteCompetition = (req,res) => {
    const id = parseInt(req.params.id);

    const index = competitions.findIndex(c => c.id === id)

    if (index === -1) {
        return res.status(404).json({message:"Nie znaleziono zawodów"});
    }
    const deleted = competitions.splice(index, 1);

    res.json({ message: 'Usunięto zawody', deleted});
};
