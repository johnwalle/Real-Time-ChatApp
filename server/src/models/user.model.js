const { Schema, model } = require('mongoose');


const userModel = new Schema({

    fullName: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    avatar: {
        type: String,
        required: true,
    }

}, { timestamps: true });

module.exports = model('User', userModel);