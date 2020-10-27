const jwt = require('jsonwebtoken');
const router = require('express').Router();
const verifyToken = require('../handlers/verifyToken');
const {PythonShell} = require('python-shell');

router.get('',(req, res) => {
    res.render('./pages/decrypt');
});

router.post ('', (req,res) => {
    const key = req.body.key_file;
    const file = req.body.user_file;
    
    let pyshell = new PythonShell('./public/scripts/py/decrypt.py', {
        mode: 'binary',
        args: [key, file]
    });
    
    pyshell.end(function (err) {
        if (err) throw err;
        console.log('Key Generated');
    });
})

module.exports = router;