const jwt = require('jsonwebtoken');
const router = require('express').Router();
const verifyToken = require('../handlers/verifyToken');
const {PythonShell} = require('python-shell');

router.get('',(req, res) => {
    res.render('./pages/generate');
});

router.post ('', (req,res) => {
    const key_name = req.body.key_name;
    
    let pyshell = new PythonShell('./public/scripts/py/generate.py', {
        mode: 'binary',
        args: [key_name]
    });
    
    pyshell.end(function (err) {
        if (err) throw err;
        console.log('Key Generated');
        res.redirect('/encrypt');
    });

})

module.exports = router;