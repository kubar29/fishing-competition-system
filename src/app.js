const express = require('express');
const cors = require('cors');
const testRoutes = require('./routes/test.routes');
const competitionRouters = require('./routes/competition.routes');
const competitorRoutes = require('./routes/competitor.routes');
const teamRoutes = require('./routes/team.routes');
const roundRoutes = require("./routes/round.routes");
const sectorRoutes = require("./routes/sector.routes");
const startRoutes = require("./routes/start.routes");
const resultRoutes = require('./routes/result.routes');
const authRoutes = require('./routes/auth.routes');



require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/competitions', competitionRouters);
app.use('/api/competitors', competitorRoutes);
app.use('/api/teams', teamRoutes);
app.use("/api/rounds", roundRoutes);
app.use("/api/sectors", sectorRoutes);
app.use("/api/starts", startRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/test', testRoutes)

// testowy endpoint
app.get('/', (req, res) => {
  res.send('API działa!');
});

module.exports = app;