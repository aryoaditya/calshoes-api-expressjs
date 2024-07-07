const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    productSizeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
module.exports = mongoose.model('orderItems', orderItemSchema)