const express = require('express');
const userRoutes = require('./routes/route.user');
const authRoutes = require('./routes/route.auth');

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
