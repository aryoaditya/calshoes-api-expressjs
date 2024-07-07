import express from "express"
import dotenv from "dotenv"
import db from "./models/index.js"

dotenv.config()
const HOST = process.env.HOST
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const app = express()

app.get('/', (req, res) => {
    res.json({
        "message": "Hello World"
    })
})

db.mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Successfully connected to MongoDB.")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${HOST}:${PORT}`)
        })
    }).catch((err) => {
        console.log("Connection failed!", err)
    })