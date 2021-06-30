const router = require('express').Router();
const Attendee = require('../Models/Attendee')

router.route('/getAttendees').get((req,res) => {
    Attendee.find((err, data) => {
        if(err){
            console.log(err)
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving Attendee."
            });
        }
        res.send(data)
    });
});

module.exports = router;