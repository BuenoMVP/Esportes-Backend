//imports
const express = require('express')
const router = express.Router()

//definição dos controllers e middleware
const { createCategory, listAllCategories, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { verifyTokenAdmin } = require('../middlewares/authMiddleware')

router.get('/', listAllCategories)//lista todas as categorias

router.post('/', verifyTokenAdmin, createCategory)//cria uma categoria

router.put('/:id', verifyTokenAdmin, updateCategory)//atualiza uma categoria

router.delete('/:id', verifyTokenAdmin, deleteCategory)//deleta uma categoria

module.exports = router