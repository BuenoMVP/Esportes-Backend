const express = require('express')
const router = express.Router()

const methods = require('../model/Methods')
const { createEsporte, listAllEsportes, updateEsporte, deleteEsporte } = require('../controllers/esportesController')

router.get('/', listAllEsportes)

router.post('/cad', createEsporte)

router.put('/edt/:id', updateEsporte)

router.delete('/del/:id', deleteEsporte)

module.exports = router