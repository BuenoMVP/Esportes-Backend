//Imports padrões
require("dotenv").config()
const express = require('express')
const app = express()

//Configurações básicas
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Conexão com o MongoDB
const connectDB = require('./config/mongoDB')
connectDB()

//Definição das rotas
const esportesRouter = require('./routes/esportes')
app.use('/api', esportesRouter)

const userRouter = require('./routes/user')
app.use('/login', userRouter)

const categoryRouter = require('./routes/category')
app.use('/category', categoryRouter)

const installRouter = require('./routes/install')
app.use('/install', installRouter)

//Documentação com swagger
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('../swagger_doc.json')
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

//Iniciando servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Running on port '+port)
})