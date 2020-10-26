const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    console.log('Connect to DB'),
)

//*Listen To PORT:3000
let server = app.listen(3000, () => {
    console.log('Up and Running at http://localhost:', server.address().port)
});