const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//* DB Models
const User = require('../models/User');

// //* Imports from validation.js
// const {
//     loginValidation
// } = require('../validation')

//* Render View
router.get('', (req, res) => {
    res.render('./pages/index');
});

//* Log In with Existing User
router.post('', async (req, res) => {
    //* Validate Data
    const {
        error
    } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //* Checking DB for Existing Data

    //*User
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Correo o  Contraseña Incorrecta');

    //* Password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Correo o Contraseña Incorrecta');

    //* Created WebToken
    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET);
    
    // res.header('auth-token', token).status('302').redirect('/user/home');

    res.header("Authorization", token);
    res.redirect(`/user/home?authorization=${token}`);
    debugger
})
module.exports = router;