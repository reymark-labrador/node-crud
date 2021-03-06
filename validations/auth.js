const Joi = require('joi');

const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    return schema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation
}