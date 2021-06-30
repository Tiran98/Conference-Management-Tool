const mongoose = require('mongoose');

const reviwerSchema = new mongoose.Schema({
    reviewerName: {
        type: String,
        required: true,
    },
    reviewerEmail: {
        type: String,
        required: true,
    },
    r_Password: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Reviewer', reviwerSchema);