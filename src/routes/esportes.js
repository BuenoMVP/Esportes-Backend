const express = require('express')
const router = express.Router()

const { createEsporte, listAllEsportes, updateEsporte, deleteEsporte } = require('../controllers/esportesController')

router.get('/', listAllEsportes)

router.post('/', createEsporte)

router.put('/:id', updateEsporte)

router.delete('/:id', deleteEsporte)

module.exports = router