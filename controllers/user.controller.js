const User = require('../models').users
const { successResponse, clientErrorResponse, serverErrorResponse } = require('../utils/responseHandler')

exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber } = req.body
        const userId = req.userId
    
        const updatedUser = await User.findByIdAndUpdate(userId, {
          firstName,
          lastName,
          phoneNumber,
        }, { new: true })
    
        if (!updatedUser) {
          return clientErrorResponse(res, "User not found", 404)
        }
    
        successResponse(res, updatedUser, "Updated successfully")
      } catch (err) {
        serverErrorResponse(res, err.message)
      }
}

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        const userId = req.userId

        let user = await User.findById(userId)

        if (!user) {
            return clientErrorResponse(res, "User not found", 404)
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return clientErrorResponse(res, "Invalid current password")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword
        const result = await user.save()

        successResponse(res, result, "Password updated successfully")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}