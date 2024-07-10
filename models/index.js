const dotenv = require('dotenv')
dotenv.config()
const MONGO_URL = process.env.MONGO_URL
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = MONGO_URL

// Import model schemas and assign to db object
db.users = require("./user.model")(mongoose)
db.categories = require("./category.model")(mongoose)
db.orders = require("./order.model")(mongoose)
db.carts = require("./cart.model")(mongoose)
db.cartItems = require("./cartItem.model")(mongoose)
db.products = require('./product.model')(mongoose)
db.productSizes = require("./productSize.model")(mongoose)
db.sizes = require("./size.model")(mongoose)

module.exports = db