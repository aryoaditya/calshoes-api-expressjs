const express = require('express')
const dotenv = require('dotenv')
const db = require('./models')
dotenv.config()
const HOST = process.env.HOST
const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

db.mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Successfully connected to MongoDB.")
    }).catch((err) => {
        console.log("Connection failed!", err)
    });

app.get('/', (req, res) => {
    res.json({
        "message": "Hello World"
    })
})

require('./routes/product.routes')(app)
require('./routes/auth.routes')(app)
require('./routes/order.routes')(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${HOST}:${PORT}`)
})