module.exports = (app) => {
    const productSize = require('../controllers/productSize.controller')
    const router = require('express').Router()
    const auth = require('../middlewares/auth.middleware')

    app.get('/', auth.verifyToken, auth.verifyAdmin, productSize.getAll)
    app.get('/:id', auth.verifyToken, auth.verifyAdmin, productSize.getById)
    app.post('/', auth.verifyToken, auth.verifyAdmin, productSize.create)
    app.put('/:id', auth.verifyToken, auth.verifyAdmin, productSize.update)
    app.delete('/:id', auth.verifyToken, auth.verifyAdmin, productSize.delete)

    app.use('/api/product-size', router)
}