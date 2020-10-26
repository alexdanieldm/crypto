const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

//* Connect to DB
mongoose.connect(
    process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    console.log('Connect to DB'),
)

//* Listen to PORT:3000
let server = app.listen(3000, () => {
    console.log('Up and Running at http://localhost:', server.address().port)
});

//* Assing controllers
const logInRoute = require('./controllers/logIn');
app.use('', logInRoute);