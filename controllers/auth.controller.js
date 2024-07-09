const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const User = db.users
const { 
    successResponse, 
    serverErrorResponse, 
    clientErrorResponse, 
    loginResponse 
} = require('../utils/responseHandler')

// User registration
exports.register = async (req, res) => {
    try {
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone 
        })

        const result = await user.save()
        successResponse(res, result, "User registered successfully", 201)
    } catch (err) {
        if (err.code === 11000) { // MongoDB duplicate key error
            const duplicateField = Object.keys(err.keyPattern)[0]
            console.log("duplicateField: " + duplicateField.slice(1))
            clientErrorResponse(res, `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already exists`, 400)
        } else {
            serverErrorResponse(res, err.message)
        }
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        
        if (!user) {
            return clientErrorResponse(res, "Wrong email or password", 401)
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if (!passwordMatch) {
            return clientErrorResponse(res, "Wrong email or password", 401)
        }

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        loginResponse(res, token)
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}