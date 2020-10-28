const router = require('express').Router();
const verifyToken = require('../handlers/verifyToken');
const {PythonShell} = require('python-shell');

router.get('',(req, res) => {
    res.render('./pages/encrypt');
});


const multiparty = require('multiparty')
router.post ('', (req,res) => {
    var form = new multiparty.Form({autoFiles: true});    

    form.parse(req, (err, fields, file) => {
        console.log('form parsed')
        var key_parsed = file.key_file[0]
        var user_parsed = file.user_file[0]

        console.log(key_parsed);
        console.log(user_parsed);

        key_path = key_parsed.path;
        file_path = user_parsed.path;

        console.log(key_path)
        console.log(file_path)

        let pyshell = new PythonShell('./public/scripts/py/encrypt.py', {
            mode: 'binary',
            args: [key_path, file_path]
        });
        
        pyshell.end(function (err) {
            if (err) throw err;
            console.log('File Encrypted');
            res.redirect('/decrypt')
        });

        pyshell.stdout.on('data', function (data) {
            console.log('File has been created at', data)
        });
    })
    

})

module.exports = router;