const products = require('../controllers/product.controller')
const router = require('express').Router()
const authMiddleware = require('../middlewares/auth.middleware')

module.exports = (app) => {
    // index
    router.get('/', authMiddleware.verifyToken, products.findAll)
    router.get('/:id', products.findOne)
    router.post(
        '/', 
        authMiddleware.verifyToken,
        authMiddleware.verifyAdmin,
        products.create
    )
    router.put(
        '/:id',
        authMiddleware.verifyToken,
        authMiddleware.verifyAdmin,
        products.update
    )
    router.delete(
        '/:id',
        authMiddleware.verifyToken,
        authMiddleware.verifyAdmin,
        products.delete
    )

    app.use('/api/products', router)
}