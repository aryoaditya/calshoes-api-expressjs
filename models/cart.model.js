module.exports = mongoose => {
    const cartSchema = mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        cartItems: [{
            type: mongoose.Schema.Types.ObjectId
        }],
        totalPrice: {
            type: Number
        }
    })
    
    const Cart = mongoose.model('carts', cartSchema)
    return Cart
}