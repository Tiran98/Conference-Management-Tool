const { response } = require('express');
const express = require('express');
const router = express.Router();
const Attendee = require('../model/Attendee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { attendeeRegValidation, attendeeLoginValidation } = require('../validation');

router.post('/register', async(req, res) => {

    //Validate before submitting
    const { error } = attendeeRegValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await Attendee.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new attendee
    const attendee = new Attendee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await attendee.save();
        res.send({ user: attendee._id });
    } catch (err) {
        res.status(400).send(err);
        res.json({ messagee: err });
    }
});

router.post('/login', async(req, res) => {

    //Validate before submitting
    const { error } = attendeeLoginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user exist
    const emailExist = await Attendee.findOne({ email: req.body.email });
    if (!emailExist) return res.status(400).send('Email does not exist');

    //Checking password
    const validPassword = await bcrypt.compare(req.body.password, emailExist.password)
    if (!validPassword) return res.status(400).send('Email or password is wrong');

    //Create and assign an token
    const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});


module.exports = router;