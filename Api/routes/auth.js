const { response } = require('express');
const express = require('express');
const router = express.Router();
const Attendee = require('../Models/Attendee');
const Researcher = require('../Models/Researcher');
const WorkshopPresenter = require('../Models/WorkshopPresenter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const util = require("util");
const { attendeeRegValidation, attendeeLoginValidation } = require('../validation');

//Setting upload location
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('docs');

//Add new user
router.post('/register', upload, async(req, res) => {

    //Get the file and convert it to base64
    var filepath = "";
    var filepath64 = "";

    if (req.file) {
        filepath = req.file.path;
        filepath64 = Buffer.from(filepath).toString('base64');
    }

    //Validate before submitting
    const { error } = attendeeRegValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    if (req.body.userType == 'attendee') {
        const emailExist = await Attendee.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email already exists');
    } else if (req.body.userType == 'researcher') {
        const emailExist = await Researcher.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email already exists');
    } else if (req.body.userType == 'workshop_presenter') {
        const emailExist = await WorkshopPresenter.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email already exists');
    }

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    var attendee = "";
    var researcher = "";
    var workshop_presenter = "";

    if (req.body.userType == 'attendee') {
        //Create a new attendee
        attendee = new Attendee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });
    } else if (req.body.userType == 'researcher') {
        //Create a new researcher
        researcher = new Researcher({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            city: req.body.city,
            researchTitle: req.body.researchTitle,
            file: filepath64,
        });
    } else if (req.body.userType == 'workshop_presenter') {
        //Create a new presenter
        workshop_presenter = new WorkshopPresenter({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            city: req.body.city,
            workshopTitle: req.body.workshopTitle,
            file: filepath64,
        });
    }

    try {
        if (req.body.userType == 'attendee') {
            const savedUser = await attendee.save();
            res.send({ user: savedUser._id });
        } else if (req.body.userType == 'researcher') {
            const savedUser = await researcher.save();
            res.send({ user: savedUser._id });
        } else if (req.body.userType == 'workshop_presenter') {
            const savedUser = await workshop_presenter.save();
            res.send({ user: savedUser._id });
        }
    } catch (err) {
        res.status(400).send(err);
        res.json({ messagee: err });
    }
});

//Login function
router.post('/login', async(req, res) => {

    //Validate before submitting
    const { error } = attendeeLoginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var emailExist = "";
    //Checking if the user exist
    if (req.body.userType == 'attendee') {
        emailExist = await Attendee.findOne({ email: req.body.email });
        if (!emailExist) return res.status(400).send('Email does not exist');
    } else if (req.body.userType == 'researcher') {
        emailExist = await Researcher.findOne({ email: req.body.email });
        if (!emailExist) return res.status(400).send('Email does not exist');
    } else if (req.body.userType == 'workshop_presenter') {
        emailExist = await WorkshopPresenter.findOne({ email: req.body.email });
        if (!emailExist) return res.status(400).send('Email does not exist');
    }

    //Checking password
    const validPassword = await bcrypt.compare(req.body.password, emailExist.password)
    if (!validPassword) return res.status(400).send('Email or password is wrong');

    //Create and assign an token
    const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN_SECRET);
    const user = {
        user: emailExist,
        token: token,
    };
    res.header('auth-token', token).send(user);

});

//Update an user
router.put('/register/:userId', async(req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }

    const id = req.params.userId;
    var updatedUser = "";

    if (req.body.userType == 'attendee') {
        updatedUser = await Attendee.findByIdAndUpdate(id, req.body, { useFindAndModify: false, returnOriginal: false });
        if (!updatedUser) return res.status(400).send('Update failed.');
    } else if (req.body.userType == 'researcher') {
        updatedUser = await Researcher.findByIdAndUpdate(id, req.body, { useFindAndModify: false, returnOriginal: false });
        if (!updatedUser) return res.status(400).send('Update failed.');
    } else if (req.body.userType == 'workshop_presenter') {
        updatedUser = await WorkshopPresenter.findByIdAndUpdate(id, req.body, { useFindAndModify: false, returnOriginal: false });
        if (!updatedUser) return res.status(400).send('Update failed.');
    }

    res.send(updatedUser);
});

//Delete an user
router.delete('/register/:userId', async(req, res) => {
    const id = req.params.userId;
    var updatedUser = "";

    if (req.body.userType == 'attendee') {
        updatedUser = await Attendee.findOneAndDelete({ "_id": id });
        if (!updatedUser) return res.status(400).send('Delete failed.');
    } else if (req.body.userType == 'researcher') {
        updatedUser = await Researcher.findOneAndDelete({ "_id": id });
        if (!updatedUser) return res.status(400).send('Delete failed.');
    } else if (req.body.userType == 'workshop_presenter') {
        updatedUser = await WorkshopPresenter.findOneAndDelete(id);
        if (!updatedUser) return res.status(400).send('Delete failed.');
    }

    res.send(updatedUser);
});


module.exports = router;