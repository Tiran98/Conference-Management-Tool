const mongoose = require('mongoose');

const workshopPresenterSchema = new mongoose.Schema({
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
    workshopTitle: {
        type: String,
    },
    file: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('WorkshopPresenter', workshopPresenterSchema);