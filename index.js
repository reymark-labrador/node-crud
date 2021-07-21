const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
require("dotenv").config();

//Import Routes
const userRoute = require('./routes/user.routes');

//Route Middlwares
app.use('/api', userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));