import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    orderItems : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
    }],
    shippingAddress: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    totalPrice: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('orders', orderSchema);
export default Order;