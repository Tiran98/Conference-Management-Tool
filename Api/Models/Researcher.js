const mongoose = require('mongoose');

const researcherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    researchTitle: {
        type: String,
    },
    file: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Researcher', researcherSchema);