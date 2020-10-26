const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//* DB Models
const User = require('../models/User');

//* Imports from validation.js
const {
    registerValidation,
} = require('../handlers/validation')

//* Render View
router.get('', (req, res) => {
    res.render('./pages/register');
});

//* Register New User
router.post('', async (req, res) => {

    //* Validate Data
    const {
        error
    } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //* Checking DB for Existing Data
    const userExist = await User.findOne({
        email: req.body.email
    });
    if (userExist) return res.status(400).send('El correo que ingreso ya se encuentra registrado');

    //* Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //* Create User
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        // res.send({
        //     user: user._id
        // })
        res.redirect('/');
    } catch (err) {
        res.status(400).send(err)
    }
});

module.exports = router;