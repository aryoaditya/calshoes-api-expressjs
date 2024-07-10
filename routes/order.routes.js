const auth = require('../middlewares/auth.middleware')

module.exports = (app) => {
    const order = require('../controllers/order.controller')
    const router = require('express').Router()

    router.post('/add', auth.verifyToken, order.addToCart)
    router.get('/', auth.verifyToken, order.getCart)
    router.delete('/:itemId', auth.verifyToken, order.removeCartItem)
    router.put('/:itemId/increment', auth.verifyToken, order.incrementQuantity)
    router.put('/:itemId/decrement', auth.verifyToken, order.decrementQuantity)

    app.use('/api/cart', router)
}