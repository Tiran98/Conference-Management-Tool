const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({
    editorName: {
        type: String,
        required: true,
    },
    editorEmail: {
        type: String,
        required: true,
    },
    e_Password: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Editor', editorSchema);