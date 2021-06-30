const router = require('express').Router();
const Researcher = require('../Models/Researcher')

router.route('/getResearchers').get((req,res) => {
    Researcher.find((err, data) => {
        if(err){
            console.log(err)
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving Researchers."
            });
        }
        res.send(data)
    });
});

module.exports = router;