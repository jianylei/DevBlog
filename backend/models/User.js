const mongoose = require('mongoose')

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
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: false
    },
    profileImg: {
        type: String,
        required: false
    },
    coverImg: {
        type: String,
        required: false
    },
    roles: {
        type: [String],
        default : ['Author']
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema)