const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
        passwordConfimation: Joi.ref('password')
    })
    return schema.validate(data);
}

const logInValidation = (data) => {
    const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation
module.exports.logInValidation = logInValidation