const express = require('express')
const router = express.Router()

const { createEsporte, listAllEsportes, updateEsporte, deleteEsporte } = require('../controllers/esportesController')
const { verifyToken } = require('../middlewares/authMiddleware')

router.get('/', verifyToken, listAllEsportes)

router.post('/', verifyToken, createEsporte)

router.put('/:id', verifyToken, updateEsporte)

router.delete('/:id', verifyToken, deleteEsporte)

module.exports = router