//Imports
const express = require('express')
const router = express.Router()

const { createEsporte, listAllEsportes, updateEsporte, deleteEsporte, listEsportesByCategory, listEsportesByUser } = require('../controllers/esportesController')
const { verifyToken, verifyTokenAdmin } = require('../middlewares/authMiddleware')

//Feature exclusiva
router.post('/feature', verifyTokenAdmin, listEsportesByCategory)

//Rota administrativa para ver todos os esportes do BD
router.get('/all', verifyTokenAdmin, listAllEsportes)

//Rotas para o CRUD
router.get('/', verifyToken, listEsportesByUser)

router.post('/', verifyToken, createEsporte)

router.put('/:id', verifyToken, updateEsporte)

router.delete('/:id', verifyToken, deleteEsporte)

module.exports = router