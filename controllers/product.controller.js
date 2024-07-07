import db from '../models/index.js'

const Product = db.products

export const findAll = (req, res) => {
    Product.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error while retrieving products."
            })
        })
}