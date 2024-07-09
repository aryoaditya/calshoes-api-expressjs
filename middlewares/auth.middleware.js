const db = require('../models')
const User = db.users
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const { 
    successResponse, 
    serverErrorResponse, 
    clientErrorResponse
} = require('../utils/responseHandler')

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) return clientErrorResponse(res, 'Access denied', 401)

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        clientErrorResponse(res, 'Invalid token', 401)
    }
}

exports.verifyAdmin = async (req, res, next) => {
    try {
        console.log(req.userId)
        const user = await User.findById(req.userId)
        console.log(user)
        if (!user) {
            return clientErrorResponse(res, 'User not found', 404)
        }

        if (!user.isAdmin) {
            return clientErrorResponse(res, 'Access denied', 403)
        }

        next()
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}