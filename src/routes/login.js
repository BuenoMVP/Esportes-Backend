const express = require('express')
const router = express.Router()

const { createUser, listAllUsers, getUser, updateUser, deleteUser } = require('../controllers/loginController')

router.post('/', getUser)

router.get('/users', listAllUsers)

router.post('/cad', createUser)

router.put('/edt/:id', updateUser)

router.delete('/del/:id', deleteUser)

module.exports = router