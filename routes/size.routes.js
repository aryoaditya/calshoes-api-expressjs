module.exports = (app) => {
    const size = require('../controllers/size.controller')
    const router = require('express').Router()
    const auth = require('../middlewares/auth.middleware')

    app.get('/', auth.verifyToken, auth.verifyAdmin, size.getAll)
    app.get('/:id', auth.verifyToken, auth.verifyAdmin, size.getById)
    app.post('/', auth.verifyToken, auth.verifyAdmin, size.create)
    app.put('/:id', auth.verifyToken, auth.verifyAdmin, size.update)
    app.delete('/:id', auth.verifyToken, auth.verifyAdmin, size.delete)

    app.use('/api/sizes', router)
}