import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const MONGO_URL = process.env.MONGO_URL

const db = {}
db.mongoose = mongoose
db.url = MONGO_URL

export default db