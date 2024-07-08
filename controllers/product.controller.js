const db = require('../models')
const Product = db.products

exports.findAll = async (req, res) => {
    try {
        const result = await Product.find()
        res.status(200).send({
            success: true,
            data: result
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message:
                err.message || "Some error while retrieving products."
        }) 
    }
}

exports.findOne = async (req, res) => {
    try {
        const result = await Product.findOne({
            _id: req.params.id
        })
        res.status(200).send({
            success: true,
            data: result
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message || "Some error while retrieving product."
        })
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
        res.status(200).send({
            success: true,
            message: 'Product added successfully',
            data: result
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the product."
        })
    }
}

exports.update = async (req, res) => {
    const id = req.params.id
    try{
        const result = await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Product not found with id " + id
            })
        }
        res.status(200).send({
            success: true,
            message: 'Product updated successfully',
            data: result
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while updating the product."
        })
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id
    try{
        const result = await Product.findByIdAndDelete(id, { useFindAndModify: false })
        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Product not found with id " + id
            })
        }
        res.status(200).send({
            success: true,
            message: "Product was deleted successfully",
            data: result
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while deleting the product."
        })
    }
}