const router = require('express').Router();
const Editor = require('../Models/Editor')

router.route('/getEditors').get((req,res) => {
    Editor.find((err, data) => {
        if(err){
            console.log(err)
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving Editors."
            });
        }
        res.send(data)
    });
});

router.route('/addEditor').post((req,res) => {
    const editorName = req.body.editorName;
    const editorEmail = req.body.editorEmail;
    const e_Password = req.body.e_Password;

    const newEditor = new Editor({editorName,editorEmail,e_Password});

    newEditor.save((err,data) => {
        if(err){
            console.log(err)
            res.status(400).send({
                message: err.message || "Some error occurred while Adding Editor."
            });
        }
        res.send(data)
        console.log("Editor successfuly added")
    });
});


module.exports = router;