const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
});

mongoose.model('appusers', users);