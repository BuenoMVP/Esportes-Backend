const express = require('express')
const router = express.Router()

const methods = require('../model/Methods')

router.get('/', (req, res) => {
    res.json({ esportes: methods.list() })
})

router.post('/cad', (req, res) => {
    let { name, players, time } = req.body
    res.json({ esportes: methods.new(name, players, time)})
})

router.put('/edt/:id', (req, res) => {
    let { name, players, time } = req.body
    res.json({ esportes: methods.update(req.params.id, name, players, time) })
})

router.delete('/del/:id', (req, res) => {
    res.json({ esportes: methods.delete(req.params.id) })
})

module.exports = router