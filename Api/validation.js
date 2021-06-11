//Validation
const Joi = require('@hapi/joi');

const attendeeRegValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const attendeeLoginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports.attendeeRegValidation = attendeeRegValidation;
module.exports.attendeeLoginValidation = attendeeLoginValidation;