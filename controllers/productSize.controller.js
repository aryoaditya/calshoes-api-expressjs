const db = require('../models')
const ProductSize = db.productSizes
const {
    successResponse,
    serverErrorResponse,
    clientErrorResponse,
    
} = require('../utils/responseHandler')

exports.getAll = async (req, res) => {
    try {
        const productSizes = await ProductSize.find()
        successResponse(req, productSizes, "Successfully retrived product sizes")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.getById = async (req, res) => {
    try {
        const productSize = await ProductSize.findById(req.params.id)
        if (!productSize) {
            return clientErrorResponse(res, "Product size not found with id: " + req.params.id, 404)
        }
        successResponse(res, result, "Successfully retrieved product size with id: " + req.params.id)
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.create = async (req, res) => {
    try {
        const productSize = new ProductSize({
            productSizeNumber: req.body.productSizeNumber
        })

        const result = await productSize.save()
        successResponse(res, result, "Product size added successfully", 201)
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
        const productSize = await ProductSize.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        if (!productSize) {
            return clientErrorResponse(res, "Product size not found with id: " + id, 404)
        }
        successResponse(res, productSize, "Product size updated successfully")
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
        const result = await ProductSize.findByIdAndDelete(id, { useFindAndModify: false })
        if (!result) {
            return clientErrorResponse(res, "Product size not found with id: " + id, 404)
        }
        successResponse(res, result, "Product size deleted successfully")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}