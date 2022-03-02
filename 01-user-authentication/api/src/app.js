const express = require('express');
const userRoutes = require('./routes/route.user');

const app = express();

app.use(express.json());


app.use('/api/user', userRoutes);

module.exports = app;
