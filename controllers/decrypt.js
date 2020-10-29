const router = require('express').Router();
const verifyToken = require('../handlers/verifyToken');
const {PythonShell} = require('python-shell');
const { dialog } = require('electron');

router.get('',(req, res) => {
    res.render('./pages/decrypt');
});

const multiparty = require('multiparty')
router.post ('', async (req,res) => {
    var destination = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });

    destination_path = destination.filePaths[0]
    
    var form = new multiparty.Form({autoFiles: true});    

    form.parse(req, (err, fields, file) => {
        console.log('form parsed')
        var key_parsed = file.key_file[0]
        var user_parsed = file.user_file[0]

        key_path = key_parsed.path;
        file_path = user_parsed.path;

        file_original_name = user_parsed.originalFilename;

        let pyshell = new PythonShell('./public/scripts/py/decrypt.py', {
            mode: 'binary',
            args: [key_path, file_path, file_original_name, destination_path]
        });
        
        pyshell.stdout.on('data', function (data) {
            console.log('\nDebbug, data:\n', data.toString())
        });

        pyshell.end(function (err) {
            if (err) throw err;
            console.log('File Decrypted');
            res.redirect('/decrypt')
        });
    })
})
module.exports = router;