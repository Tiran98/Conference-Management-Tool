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
const reviewRequestRoute = require('./Routes/reviewRequest');
const conferenceRoute = require('./Routes/conference');
const adminRoute = require('./routes/admin.route');
const researcherRoute = require('./Routes/researcher.route');
const workshopRoute = require('./Routes/workshop.route');
const attendeeRoute = require('./Routes/attendee.route');
const editorRoute = require('./Routes/editor.route');
const reviewerRoute = require('./Routes/reviewer.route');
const conferenceRoute = require('./Routes/conference.route');

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/reviewRequest', reviewRequestRoute);
app.use('/api/conference', conferenceRoute);
app.use('/api/admin', adminRoute);
app.use('/api/researcher', researcherRoute);
app.use('/api/workshop', workshopRoute);
app.use('/api/attendee', attendeeRoute);
app.use('/api/reviewer', reviewerRoute);
app.use('/api/editor', editorRoute);

module.exports = app;