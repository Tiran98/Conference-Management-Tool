const Joi = require('joi');

const attendeeRegValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        userType: Joi.string().required(),
        phone: Joi.string(),
        city: Joi.string(),
        researchTitle: Joi.string(),
        workshopTitle: Joi.string(),
        doc: Joi.string()
    });
    return schema.validate(data);
};

const attendeeLoginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        userType: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports.attendeeRegValidation = attendeeRegValidation;
module.exports.attendeeLoginValidation = attendeeLoginValidation;