import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const MONGO_URL = process.env.MONGO_URL

const db = {}

// Set mongoose instance
db.mongoose = mongoose
db.url = MONGO_URL

// Import model schemas and assign to db object
db.users = require("./user.model.js")(mongoose);
db.categories = require("./category.model.js")(mongoose);
db.orders = require("./order.model.js")(mongoose);
db.orderItems = require("./orderItem.model.js")(mongoose);
db.products = require("./product.model.js")(mongoose);
db.productSizes = require("./productSize.model.js")(mongoose);
db.sizes = require("./size.model.js")(mongoose);

// Export db object
export default db;