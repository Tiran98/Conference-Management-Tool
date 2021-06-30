const { response } = require('express');
const express = require('express');
const router = express.Router();
const ReviewRequest = require('../Models/ReviewRequest');

//Add a request
router.post('/', async(req, res) => {

    console.log(req.body);

    const reviewRequest = new ReviewRequest({
        docName: req.body.docName,
        file: req.body.file,
        userId: req.body.userId,
        conferenceId: req.body.conferenceId,
        userType: req.body.userType,
        docStatus: req.body.docStatus,
        comment: req.body.comment,
    });

    try {
        const savedRequest = await reviewRequest.save();
        res.json(savedRequest);
    } catch (err) {
        res.json({ message: err });
    }

});

//Get all requests
router.get('/', async(req, res) => {

    try {
        const reviewRequests = await ReviewRequest.find();
        res.json(reviewRequests);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;