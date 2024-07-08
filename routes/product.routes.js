module.exports = (app) => {
    const products = require('../controllers/product.controller')

    const router = require('express').Router()

    // index
    router.get('/', products.findAll)
    router.get('/:id', products.findOne)
    router.post('/', products.create)
    router.put('/:id', products.update)
    router.delete('/:id', products.delete)

    app.use('/api/products', router)
}