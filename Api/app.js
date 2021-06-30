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
const adminRoute = require('./routes/admin.route');
const researcherRoute = require('./Routes/researcher.route');
const workshopRoute = require('./Routes/workshop.route');
const attendeeRoute = require('./Routes/attendee.route');

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/researcher',researcherRoute);
app.use('/api/workshop',workshopRoute);
app.use('/api/attendee',attendeeRoute);

module.exports = app;