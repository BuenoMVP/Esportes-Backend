const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Página de login')
})

module.exports = router