const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 4
    },

    lastName: {
        type: String,
        require: true,
        min: 4
    },

    email: {
        type: String,
        require: true,
        min: 6
    },

    password: {
        type: String,
        require: true,
        min: 8,
        max: 1024
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);