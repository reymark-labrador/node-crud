const express = require('express');
const app = express();
const cors = require('cors')
const { Sequelize } = require('sequelize');
require("dotenv").config();

//Import Routes
const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');
const postRoute = require('./routes/post.routes');

//Middlewares
app.use(express.json());
app.use(cors());

//Route Middlwares
app.use('/api', [userRoute, authRoute]);
app.use('/api/posts', postRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));