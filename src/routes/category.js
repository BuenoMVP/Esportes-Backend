const express = require('express')
const router = express.Router()

const { createCategory, listAllCategories, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { verifyTokenAdmin } = require('../middlewares/authMiddleware')

router.get('/', listAllCategories)

router.post('/', verifyTokenAdmin, createCategory)

router.put('/:id', verifyTokenAdmin, updateCategory)

router.delete('/:id', verifyTokenAdmin, deleteCategory)

module.exports = router