const router = require('express').Router();
const Conference = require('../Models/Conference')

router.post('/', async(req, res) => {

    const conference = new Conference({
        conferenceName: req.body.conferenceName,
        managerName: req.body.managerName,
        managerEmail: req.body.managerEmail,
        managerPhone: req.body.managerPhone,
        managerAddress: req.body.managerAddress,
        conferenceVenue: req.body.conferenceVenue,
        conferenceDate: req.body.conferenceDate,
    });

    try {
        const savedCon = await conference.save();
        res.json(savedCon);
    } catch (err) {
        res.json({ message: err });
    }

});

router.get('/', async(req, res) => {

    try {
        const conference = await Conference.find();
        res.json(conference);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;