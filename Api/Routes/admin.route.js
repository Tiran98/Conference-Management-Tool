const { response } = require('express');
const express = require('express');
const router = express.Router();
const Admin = require('../Models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Admin Register
router.post('/adminRegister', async(req, res) => {


    //Checking if the user is already in the database
    const emailExist = await Admin.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    var admin = "";

    //Create a new attendee
    admin = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await admin.save();
        res.send({ user: savedUser._id });
    } catch (err) {
        console.log(err);
    }
});


//Admin Login
router.post('/adminLogin', async(req, res) => {

    var emailExist = "";
    //Checking if the user exist
    emailExist = await Admin.findOne({ email: req.body.email });
    if (!emailExist) return res.status(400).send('Email does not exist');

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

module.exports = router;