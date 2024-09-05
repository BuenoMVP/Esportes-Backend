//Imports
const express = require('express')
const router = express.Router()

const { createEsporte, listAllEsportes, updateEsporte, deleteEsporte, listEsportesByCategory } = require('../controllers/esportesController')
const { verifyToken, verifyTokenAdmin } = require('../middlewares/authMiddleware')

//Feature exclusiva
router.post('/feature', verifyTokenAdmin, listEsportesByCategory)

//Rotas para o CRUD
router.get('/', verifyToken, listAllEsportes)

router.post('/', verifyToken, createEsporte)

router.put('/:id', verifyToken, updateEsporte)

router.delete('/:id', verifyToken, deleteEsporte)

module.exports = router