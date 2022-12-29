const mongoose = require('mongoose')
const { ROLES } = require('../config/constants')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    about: {
        type: String,
        required: false
    },
    image: {
        type:String,
        required: false
    },
    role: {
        type: String,
        enum: [ROLES.Author, ROLES.Moderator, ROLES.Admin],
        default : ROLES.Author
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema)