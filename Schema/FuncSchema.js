const mongoose = require('mongoose');

const func = new mongoose.Schema({
    author:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    note:{
        type:String,
        required: true,
    }
});

mongoose.model('functionality', func);