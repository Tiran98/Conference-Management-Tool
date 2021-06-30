const router = require('express').Router();
const Reviewer = require('../Models/Reviewer')

router.route('/getReviewers').get((req,res) => {
    Reviewer.find((err, data) => {
        if(err){
            console.log(err)
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving Reviewers."
            });
        }
        res.send(data)
    });
});

router.route('/addReviewer').post((req,res) => {
    const reviewerName = req.body.reviewerName;
    const reviewerEmail = req.body.reviewerEmail;
    const r_Password = req.body.r_Password;

    const newReviewer = new Reviewer({reviewerName,reviewerEmail,r_Password});

    newReviewer.save((err,data) => {
        if(err){
            console.log(err)
            res.status(400).send({
                message: err.message || "Some error occurred while Adding Reviewer."
            });
        }
        res.send(data)
        console.log("Reviewer successfuly added")
    });
});


module.exports = router;