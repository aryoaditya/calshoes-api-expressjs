module.exports = (app) => {
    const category = require('../controllers/category.controller')
    const auth = require('../middlewares/auth.middleware')
    const router = require('express').Router()

    router.get('/', category.getAll)
    router.get('/:id', auth.verifyToken, auth.verifyAdmin, category.getById)
    router.post('/', auth.verifyToken, auth.verifyAdmin, category.create)
    router.put('/:id', auth.verifyToken, auth.verifyAdmin, category.update)
    router.delete('/:id', auth.verifyToken, auth.verifyAdmin, category.delete)

    app.use('/api/category', router)
}