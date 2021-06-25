const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Import Routes
const authRoute = require('./routes/auth');

app.use('/api/user', authRoute);

module.exports = app;