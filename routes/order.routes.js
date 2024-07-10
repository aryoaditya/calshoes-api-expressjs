const auth = require('../middlewares/auth.middleware')

module.exports = (app) => {
    const order = require('../controllers/order.controller')
    const router = require('express').Router()

    router.post('/add', auth.verifyToken, order.addToCart)

    app.use('/api/cart', router)
}