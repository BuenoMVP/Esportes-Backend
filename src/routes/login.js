const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const { createUser, listAllUsers, updateUser, deleteUser } = require('../controllers/loginController')

router.get('/', listAllUsers)

router.post('/cad', createUser)

router.put('/edt/:id', updateUser)

router.delete('/del/:id', deleteUser)

module.exports = router