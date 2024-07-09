const db = require('../models')
const { 
    successResponse, 
    serverErrorResponse, 
    clientErrorResponse
} = require('../utils/responseHandler')
const Product = db.products

exports.findAll = async (req, res) => {
    try {
        const result = await Product.find()
        successResponse(res, result, "Successfully retrieved products")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.findOne = async (req, res) => {
    try {
        const result = await Product.findById(req.params.id)
        if (!result) {
            return clientErrorResponse(res, "Product not found with id: " + req.params.id, 404)
        }
        successResponse(res, result, "Successfully retrieved product with id: " + req.params.id)
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.create = async (req, res) => {
    try{
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category_id: req.body.category_id,
        })

        const result = await product.save()
        successResponse(res, result, "Product added successfully", 201)
    } catch (err) {
        if (err.name === "ValidationError") {
            clientErrorResponse(res, err.message)
            
        } else {
            serverErrorResponse(res, err.message)
        }
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id
        const result = await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        if (!result) {
            return clientErrorResponse(res, "Product not found with id: " + id, 404)
        }
        successResponse(res, result, "Product updated successfully")
        
    } catch (err) {
        if (err.name === "ValidationError") {
            clientErrorResponse(res, err.message)
        } else {
            serverErrorResponse(res, err.message)
        }
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id
        const result = await Product.findByIdAndDelete(id, { useFindAndModify: false })
        if (!result) {
            return clientErrorResponse(res, "Product not found with id: " + id, 404)
        }
        successResponse(res, result, "Product was deleted successfully")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}