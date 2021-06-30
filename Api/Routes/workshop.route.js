const router = require('express').Router();
const Workshop = require('../Models/WorkshopPresenter')

router.route('/getWorkshops').get((req,res) => {
    Workshop.find((err, data) => {
        if(err){
            console.log(err)
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving workshops."
            });
        }
        res.send(data)
    });
});

module.exports = router;