const db = require('../models')
const Cart = db.carts
const CartItem = db.cartItems
const Product = db.products
const ProductSize = db.productSizes
const { 
    successResponse,
    serverErrorResponse,
    clientErrorResponse
 } = require('../utils/responseHandler')

exports.addToCart = async(req, res) => {
    try {
        const { productSizeId, quantity } = req.body

        // Check if user has a cart
        let cart = await Cart.findOne({ userId: req.userId })
        if(!cart) {
            cart = new Cart({
                userId: req.userId,
                cartItems: [],
                totalPrice: 0
            })
        }

        // Retrieve product size information
        const productSize = await ProductSize.findById(productSizeId)
        if (!productSize) {
            return clientErrorResponse(res, 'Product size not found', 404)
        }
        
        // Retrieve product information based on productSize
        const product = await Product.findById(productSize.productId)
        if (!product) {
            return clientErrorResponse(res, 'Product not found', 404)
        }

        // Check if productSize has been added
        let cartItem = await CartItem.findOne({ productSizeId: productSizeId})
        if (!cartItem) {
            cartItem = new CartItem({
                productSizeId: productSizeId,
                quantity: quantity,
                price: product.price * quantity
            })

            cart.totalPrice += cartItem.price
            cart.cartItems.push(cartItem)
            await cart.save()
        } else {
            cartItem.quantity += quantity
            cartItem.price = product.price * cartItem.quantity
            cart.totalPrice += product.price * quantity
        }

        await cart.save()
        const result = await cartItem.save()

        successResponse(res, result, "Added item successfully")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}