exports.testEndpoint = (req,res) => {
    const data = req.body;

    res.json({
        message: 'Działa poprawnie',
        teceiveData: data
    });
};