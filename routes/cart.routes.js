const auth = require('../middlewares/auth.middleware')

module.exports = (app) => {
    const cart = require('../controllers/cart.controller')
    const router = require('express').Router()

    router.post('/add', auth.verifyToken, cart.addToCart)
    router.get('/', auth.verifyToken, cart.getCart)
    router.delete('/:itemId', auth.verifyToken, cart.removeCartItem)
    router.put('/:itemId/increment', auth.verifyToken, cart.incrementQuantity)
    router.put('/:itemId/decrement', auth.verifyToken, cart.decrementQuantity)

    app.use('/api/cart', router)
}