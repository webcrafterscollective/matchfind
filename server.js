// server.js

const express = require('express');
const userRoutes = require('./routes/userRoutes'); 

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies !important

app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;