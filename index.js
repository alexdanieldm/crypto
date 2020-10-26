const express = require('express')
const app = express()

//*Listen To PORT:3000
let server = app.listen(3000, () => {
    console.log('Up and Running at http://localhost:', server.address().port)
});