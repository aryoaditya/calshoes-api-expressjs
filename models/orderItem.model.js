import mongoose from 'mongoose'

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

const OrderItem = mongoose.model('orderItems', orderItemSchema);
export default OrderItem;