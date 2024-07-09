module.exports = (app) => {
    const auth = require('../controllers/auth.controller')
    const router = require('express').Router()

    // index
    router.post('/register', auth.register)
    router.post('/login', auth.login)

    app.use('/api', router)
}