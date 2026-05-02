let competitors = [];

exports.getAllCompetitors = (req, res) => {
    res.json(competitors);
};

exports.createCompetitor = (req, res) => {
    const { name, surname, category } = req.body;

    const newCompetitor = {
        id: Date.now(),
        name,
        surname,
        category
    };

    competitors.push(newCompetitor);

    res.status(201).json(newCompetitor);
};

exports.getCompetitorById = (req, res) => {
    const id = parseInt(req.params.id);

    const competitor = competitors.find(c => c.id === id);

    if (!competitor) {
        return res.status(404).json({ message: "Nie znaleziono zawodnika"});
    }

    res.json(competitor);
};