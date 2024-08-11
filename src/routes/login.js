const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/authMiddleware')

const { createUser, listAllUsers, getUser, updateUser, deleteUser } = require('../controllers/loginController')

router.post('/', getUser)

router.get('/users', verifyToken, listAllUsers)

router.post('/cad', verifyToken, createUser)

router.put('/edt/:id', verifyToken, updateUser)

router.delete('/del/:id', verifyToken, deleteUser)

module.exports = router