const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        createdDate: {
            type: Date,
            default: ''
        },
        updatedDate: {
            type: Date,
            default: ''
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('users', userSchema)