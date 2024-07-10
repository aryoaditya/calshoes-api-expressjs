module.exports = mongoose => {
    const cartItemSchema = mongoose.Schema({
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
    const CartItem = mongoose.model('cart_items', cartItemSchema)
    return CartItem
}