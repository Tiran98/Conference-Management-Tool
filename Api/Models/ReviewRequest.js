const mongoose = require('mongoose');

const reviewRequestSchema = new mongoose.Schema({
    docName: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    conferenceId: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
    },
    docStatus: {
        type: String,
    },
    comment: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('ReviewRequest', reviewRequestSchema);