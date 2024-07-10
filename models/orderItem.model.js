module.exports = mongoose => {
    const orderItemSchema = mongoose.Schema({
        quantity: {
            type: Number,
            required: true
        },
        productSizeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        price:{
            type: Number,
            required: true
        }
    });
    const OrderItem = mongoose.model('order_items', orderItemSchema)
    return OrderItem
}