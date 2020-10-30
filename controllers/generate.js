const router = require('express').Router();
const {PythonShell} = require('python-shell');
const { dialog } = require('electron');

router.get('',(req, res) => {
    res.render('./pages/generate');
});

router.post ('', async (req,res) => {

    var destination = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    destination_path = destination.filePaths[0]

    const key_name = req.body.key_name;
    const recipient = req.body.recipient;
    
    let pyshell = new PythonShell('./public/scripts/py/generate.py', {
        mode: 'binary',
        args: [key_name, destination_path, recipient]
    });
    
    pyshell.end(function (err) {
        if (err) throw err;
        console.log('Key Generated');
        res.redirect('/encrypt');
    });

})

module.exports = router;