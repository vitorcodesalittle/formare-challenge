const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user');
const consultantRoutes = require('./routes/consultant');
const messageRoutes = require('./routes/message');
require('dotenv').config();

const PORT = proccess.env.port || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// -- ROUTES --
app.use('user', userRoutes);
app.use('consultant', consultantRoutes);
app.use('message', messageRoutes);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`))