const db = require('../models')
const Category = db.categories
const {
    successResponse,
    serverErrorResponse,
    clientErrorResponse,
    
} = require('../utils/responseHandler')

exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find()
        successResponse(req, categories, "Successfully retrived categories")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return clientErrorResponse(res, "Category not found with id: " + req.params.id, 404)
        }
        successResponse(res, result, "Successfully retrieved category with id: " + req.params.id)
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}

exports.create = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name
        })

        const result = await category.save()
        successResponse(res, result, "Category added successfully", 201)
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
        const category = await Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        if (!category) {
            return clientErrorResponse(res, "Category not found with id: " + id, 404)
        }
        successResponse(res, category, "Category updated successfully")
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
        const result = await Category.findByIdAndDelete(id, { useFindAndModify: false })
        if (!result) {
            return clientErrorResponse(res, "Category not found with id: " + id, 404)
        }
        successResponse(res, result, "Category deleted successfully")
    } catch (err) {
        serverErrorResponse(res, err.message)
    }
}