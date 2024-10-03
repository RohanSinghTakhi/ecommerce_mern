const express = require('express')
const app = express()
const env = require('dotenv')
const mongoose = require('mongoose')

env.config();
const bodyParser = require('body-parser')

// Use body-parser middleware explicitly for JSON and URL-encoded data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://rohan:rohan2005@cluster0.dzgso.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
}).catch(err => {
    console.error('Database connection error:', err)
})

const port = process.env.PORT || 3000

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "hello"
    })
})

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
