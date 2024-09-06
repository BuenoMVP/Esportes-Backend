//imports
const Category = require('../model/Category')

//função para criar uma categoria
const createCategory = async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.summary = 'ADM - Criar Categoria no Banco'
    // #swagger.description = 'Rota responsável por criar as categorias válidas para inserção dos esportes. Acessível somente por ADMs'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const { name, description } = req.body
    
    try {
        const newCategory = new Category({ 
            id_api: Date.now(),
            name: name, 
            description: description 
        })
        await newCategory.save()
        res.status(201).send(newCategory)
    } catch (err) {
        res.status(500).send({ "Error to create Category": err })
    }
}

//função para listar todas as categorias
const listAllCategories = async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.summary = 'Lista as Categorias presentes no Banco'
    // #swagger.description = 'Rota responsável por listar todas as categorias válidas para inserção dos esportes'
    const limit = parseInt(req.query.limite) || 5
    const pagina = parseInt(req.query.pagina) || 1
    const offset = limit * (pagina - 1)

    try {
        const listCategory = await Category.find().skip(offset).limit(limit)
        res.status(200).send(listCategory)
    } catch (err) {
        res.status(500).send({ "Error to list Categories": err })
    }
}

//função para atalizar uma categoria
const updateCategory = async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.summary = 'ADM - Atualizar Categoria no Banco'
    // #swagger.description = 'Rota responsável por atualizar as categorias válidas para inserção dos esportes. Acessível somente por ADMs'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const { id } = req.params
    const { name, description } = req.body
    
    try {
        const updatedCategory = await Category.findOneAndUpdate({ id_api: id },{ 
            name: name, 
            description: description 
        })

        if (!updatedCategory) {
            res.status(404).send({ err: "Category not found" })
        }

        res.status(200).send(updatedCategory)
    } catch (err) {
        res.status(500).send({ "Error to update Category": err })
    }
}

//função para deletar uma categoria
const deleteCategory = async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.summary = 'ADM - Deletar Categoria no Banco'
    // #swagger.description = 'Rota responsável por deletar as categorias para inserção dos esportes. Acessível somente por ADMs'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const { id } = req.params

    try {
        const deletedCategory = await Category.findOneAndDelete({ id_api: id })

        if (!deletedCategory) {
            res.status(404).send({ err: "Category not found"})
        }

        res.status(200).send(deletedCategory)
    } catch (err) {
        res.status(500).send({ "Error to delete Category": err})
    }
}

module.exports = { createCategory, listAllCategories, updateCategory, deleteCategory }