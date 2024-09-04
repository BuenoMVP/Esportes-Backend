const express = require('express')
const router = express.Router()
const { verifyTokenAdmin, verifyToken } = require('../middlewares/authMiddleware')

const { createUser, listAllUsers, getUser, updateUser, deleteUser, createUserAdmin, updateAllUser, deleteAllUser } = require('../controllers/userController')

router.post('/', getUser)

router.post('/cad', createUser)

router.put('/', verifyToken, updateUser)

router.delete('/', verifyToken, deleteUser)

router.get('/users', verifyTokenAdmin, listAllUsers)

router.post('/Adm', verifyTokenAdmin, createUserAdmin)

router.put('/adm/:id', verifyTokenAdmin, updateAllUser)

router.delete('/Adm/:id', verifyTokenAdmin, deleteAllUser)

module.exports = router