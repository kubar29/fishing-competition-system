const express = require('express');
const cors = require('cors');
const competitionRouters = require('./routes/competition.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/competitions', competitionRouters)

const testRoutes = require('./routes/test.routes');
app.use('/api/test', testRoutes)

// testowy endpoint
app.get('/', (req, res) => {
  res.send('API działa!');
});

module.exports = app;