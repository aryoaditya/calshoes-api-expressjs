module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const router = require('express').Router()
    const auth = require('../middlewares/auth.middleware.js')

    router.put('/profile', auth.verifyToken, users.updateProfile)
    router.put('/change-password', auth.verifyToken, users.updatePassword)
    
    app.use('/api/profile', router)
}