const auth = require('../middlewares/auth.middleware')

module.exports = (app) => {
    const order = require('../controllers/order.controller')
    const router = require('express').Router()

    router.post('/', auth.verifyToken, order.order)
    router.get('/', auth.verifyToken, order.transactionActive)

    app.use('/api/order', router)
}