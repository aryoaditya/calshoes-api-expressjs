const db = require('../models')
const Cart = db.carts
const Order = db.orders
const { 
    successResponse,
    serverErrorResponse,
    clientErrorResponse
} = require('../utils/responseHandler')

exports.order = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId })
        if (!cart) {
            return clientErrorResponse(res, "Cart not found", 404)
        }

        const newOrder = new Order({
            userId: req.userId,
            cartId: cart._id,
            shippingAddress: req.body.shippingAddress,
            city: req.body.city,
            zip: req.body.zip,
            status: 'Pending',
        })

        const savedOrder = await newOrder.save()

        cart.items = []
        await cart.save()

        successResponse(res, savedOrder, "Order waiting for payment")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.transactionActive = async (req, res) => {
    try {
        const orderActive = await Order.findOne({userId: req.userId})
        if (!orderActive) {
            clientErrorResponse(res, "No transactions active found")
        }
        successResponse(res, orderActive)
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}