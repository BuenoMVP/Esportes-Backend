require("dotenv").config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const esportesRouter = require('./routes/esportes')
app.use('/api', esportesRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Running on port '+port)
})