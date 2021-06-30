const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
    conferenceName: {
        type: String,
        required: true,
    },
    managerName: {
        type: String,
        required: true,
    },
    managerEmail: {
        type: String,
        required: true,
    },
    managerPhone: {
        type: String,
        required: true,
    },
    managerAddress: {
        type: String,
    },
    conferenceVenue: {
        type: String,
    },
    conferenceDate: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Conference', conferenceSchema);