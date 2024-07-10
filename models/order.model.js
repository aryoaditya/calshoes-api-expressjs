module.exports = mongoose => {
    const orderSchema = mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
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
        createdDate: {
            type: Date,
            default: Date.now
        }
    });
    
    const Order = mongoose.model('orders', orderSchema)
    return Order
}