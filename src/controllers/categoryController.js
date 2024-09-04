const Category = require('../model/Category')

const createCategory = async (req, res) => {
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

const listAllCategories = async (req, res) => {
    try {
        const listCategory = await Category.find()
        res.status(200).send(listCategory)
    } catch (err) {
        res.status(500).send({ "Error to list Categories": err })
    }
}

const updateCategory = async (req, res) => {
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

const deleteCategory = async (req, res) => {
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