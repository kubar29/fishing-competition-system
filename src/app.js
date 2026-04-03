const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const testRoutes = require('./routes/test.routes');
app.use('/api/test', testRoutes)

// testowy endpoint
app.get('/', (req, res) => {
  res.send('API działa!');
});

module.exports = app;