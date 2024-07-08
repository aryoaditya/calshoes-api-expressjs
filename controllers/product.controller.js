const db = require('../models')
const Product = db.products

exports.findAll = (req, res) => {
    Product.find()
    .then((result) => {
        res.status(200).send({
            success: true,
            data: result
        })
    }).catch((err) => {
        res.status(500).send({
            success: false,
            message:
                err.message || "Some error while retrieving products."
        })
    })
}

exports.findOne = (req, res) => {
    Product.findOne({
        _id: req.params.id
    })
    .then((result) => {
        res.status(200).send({
            success: true,
            data: result
        })
    }).catch((err) => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error while retrieving product."
        })
    })
}

exports.create = (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category_id: req.body.category_id,
    })

    product.save()
    .then((result) => {
        res.status(200).send({
            success: true,
            message: 'Product added successfully',
            data: result
        })
    }).catch((err) => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the product."
        })
    })
}

exports.update = (req, res) => {
    const id = req.params.id
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((result) => {
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
    }).catch((err) => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while updating the product."
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Product.findByIdAndDelete(id, { useFindAndModify: false })
    .then((result) => {
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
    }).catch((err) => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while deleting the product."
        })
    })
}