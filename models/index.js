const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()
const MONGO_URL = process.env.MONGO_URL

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = MONGO_URL

// Import model schemas and assign to db object
db.users = require("./user.model.js")(mongoose)
db.categories = require("./category.model.js")(mongoose)
db.orders = require("./order.model.js")(mongoose)
db.orderItems = require("./orderItem.model.js")(mongoose)
db.products = require("./product.model.js")(mongoose)
db.productSizes = require("./productSize.model.js")(mongoose)
db.sizes = require("./size.model.js")(mongoose)

module.exports = db