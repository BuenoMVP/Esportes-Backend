const express = require('express')
const router = express.Router()

const { createCategory, listAllCategories, updateCategory, deleteCategory } = require('../controllers/categoryController')

router.get('/', listAllCategories)

router.post('/', createCategory)

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)

module.exports = router