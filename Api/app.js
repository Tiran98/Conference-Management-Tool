// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv/config');

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

//Import Routes
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin.route');
const researcherRoute = require('./Routes/researcher.route');
const workshopRoute = require('./Routes/workshop.route');

app.use('/api/user', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/researcher', researcherRoute);
app.use('/api/workshop', workshopRoute);

// //connect to db
// mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
//     .then((result) => console.log('connected to db'))
//     .catch((err) => console.log(err));

// app.listen(5000);