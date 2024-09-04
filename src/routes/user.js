const express = require('express')
const router = express.Router()
const { verifyTokenAdmin } = require('../middlewares/authMiddleware')

const { createUser, listAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')

router.post('/', getUser)

router.get('/users', verifyTokenAdmin, listAllUsers)

router.post('/cad', verifyTokenAdmin, createUser)

router.put('/:id', verifyTokenAdmin, updateUser)

router.delete('/:id', verifyTokenAdmin, deleteUser)

module.exports = router