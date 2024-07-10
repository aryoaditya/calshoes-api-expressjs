const db = require('../models')
const Size = db.sizes
const {
    successResponse,
    serverErrorResponse,
    clientErrorResponse,
    
} = require('../utils/responseHandler')

exports.getAll = async (req, res) => {
    try {
        const sizes = await Size.find()
        successResponse(req, sizes, "Successfully retrived sizes")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.getById = async (req, res) => {
    try {
        const size = await Size.findById(req.params.id)
        if (!size) {
            return clientErrorResponse(res, "Size not found with id: " + req.params.id, 404)
        }
        successResponse(res, result, "Successfully retrieved size with id: " + req.params.id)
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.create = async (req, res) => {
    try {
        const size = new Size({
            sizeNumber: req.body.sizeNumber
        })

        const result = await size.save()
        successResponse(res, result, "Size added successfully", 201)
    } catch (err) {
        if (err.name === "ValidationError") {
            clientErrorResponse(res, err.message)
        } else {
            serverErrorResponse(res, err.message)
        }
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const size = await Size.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        if (!size) {
            return clientErrorResponse(res, "Size not found with id: " + id, 404)
        }
        successResponse(res, size, "Size updated successfully")
    } catch (err) {
        if (err.name === "ValidationError") {
            clientErrorResponse(res, err.message)
        } else {
            serverErrorResponse(res, err.message)
        }
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Size.findByIdAndDelete(id, { useFindAndModify: false })
        if (!result) {
            return clientErrorResponse(res, "Size not found with id: " + id, 404)
        }
        successResponse(res, result, "Size deleted successfully")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}