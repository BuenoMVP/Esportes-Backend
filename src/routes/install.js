//Imports
const express = require('express')
const router = express.Router()

const { install } = require('../controllers/installController')

//Rotas para o instalador
router.get('/', install)

module.exports = router