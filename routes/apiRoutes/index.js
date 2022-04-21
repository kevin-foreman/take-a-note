const express = require('express');
const app = express();

const noteRoutes = require('./noteRoutes');

app.use(noteRoutes);

module.exports = noteRoutes;