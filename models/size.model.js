const mongoose = require('mongoose')

const sizeSchema = mongoose.Schema({
    sizeNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('sizes', sizeSchema)