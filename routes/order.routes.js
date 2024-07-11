const auth = require('../middlewares/auth.middleware')

module.exports = (app) => {
    const order = require('../controllers/order.controller')
    const router = require('express').Router()

    router.post('/add', auth.verifyToken, order.addToCart)
    router.get('/', auth.verifyToken, order.getCart)
    router.delete('/:itemId', auth.verifyToken, order.removeCartItem)
    router.put('/:itemId/increment', auth.verifyToken, order.incrementQuantity)
    router.put('/:itemId/decrement', auth.verifyToken, order.decrementQuantity)
    router.post('/order', auth.verifyToken, order.order)
    router.get('/order', auth.verifyToken, order.transactionActive)

    app.use('/api/cart', router)
}