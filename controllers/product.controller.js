const db = require('../models')
const { 
    responseSuccessHandler, 
    responseErrorHandler, 
    responseNotFoundHandler, 
    responseValidationErrorsHandler 
} = require('../utils/responseHandler')
const Product = db.products

exports.findAll = async (req, res) => {
    try {
        const result = await Product.find()
        responseSuccessHandler(res, result)
    } catch (err) {
        responseErrorHandler(res, 500, err.message)
    }
}

exports.findOne = async (req, res) => {
    try {
        const result = await Product.findById(req.params.id)
        if (!result) {
            return responseNotFoundHandler(res, "Product not found with id " + req.params.id)
        }
        responseSuccessHandler(res, result)
    } catch (err) {
        responseErrorHandler(res, 500, err.message)
    }
}

exports.create = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category_id: req.body.category_id,
    })

    try{
        const result = await product.save()
        responseSuccessHandler(res, result, 'Product added successfully')
    } catch (err) {
        if (err.name === 'ValidationError') {
            responseValidationErrorsHandler(res, err.message)
            
        } else {
            responseErrorHandler(res, 500, err.message)
        }
    }
}

exports.update = async (req, res) => {
    const id = req.params.id
    try{
        const result = await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        if (!result) {
            return responseNotFoundHandler(res, "Product not found with id " + id)
        }
        responseSuccessHandler(res, result, 'Product updated successfully')
        
    } catch (err) {
        if (err.name === 'ValidationError') {
            responseValidationErrorsHandler(res, err.message)
        } else {
            responseErrorHandler(res, 500, err.message)
        }
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id
    try{
        const result = await Product.findByIdAndDelete(id, { useFindAndModify: false })
        if (!result) {
            return responseNotFoundHandler(res, "Product not found with id " + id)
        }
        responseSuccessHandler(res, result, "Product was deleted successfully")
    } catch (err) {
        responseErrorHandler(res, 500, err.message)
    }
}