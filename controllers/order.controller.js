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

exports.getCart = async (req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.userId}).populate('cartItems')
        if (!cart) {
            return clientErrorResponse(res, "No items found", 404)
        }
        successResponse(res, cart)
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.addToCart = async(req, res) => {
    try {
        const { productSizeId, quantity } = req.body

        // Check if user has a cart
        let cart = await Cart.findOne({ userId: req.userId }).populate('cartItems')
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

exports.removeCartItem = async (req, res) => {
    try {
        const { itemId } = req.params
        
        // Check if cart item exists
        const cartItem = await CartItem.findById(itemId)
        if (!cartItem) {
            return clientErrorResponse(res, 'Cart item not found', 404)
        }

        // Find the user's cart and update the total price
        const cart = await Cart.findOneAndUpdate(
            { userId: req.userId },
            {
                $pull: { cartItems: itemId },
                $inc: { totalPrice: -cartItem.price }
            },
            { new: true }
        ).populate('cartItems')

        if (!cart) {
            return clientErrorResponse(res, 'Cart not found', 404)
        }

        // Delete the cart item
        await CartItem.findByIdAndDelete(itemId)

        successResponse(res, cart, 'Cart item removed successfully')
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}