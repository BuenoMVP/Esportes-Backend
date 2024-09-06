//Imports
const express = require('express')
const router = express.Router()

//recebe os middleware e controllers
const { verifyTokenAdmin, verifyToken } = require('../middlewares/authMiddleware')
const { createUser, listAllUsers, getUser, updateUser, deleteUser, createUserAdmin, updateAllUser, deleteAllUser } = require('../controllers/userController')

//Rotas para o CRUD
router.post('/', getUser)

router.post('/cad', createUser)

router.put('/', verifyToken, updateUser)

router.delete('/', verifyToken, deleteUser)

//Rotas para os administradores
router.get('/users', verifyTokenAdmin, listAllUsers)

router.post('/adm', verifyTokenAdmin, createUserAdmin)

router.put('/adm/:id', verifyTokenAdmin, updateAllUser)

router.delete('/adm/:id', verifyTokenAdmin, deleteAllUser)

module.exports = router