//Imports
const mongoose = require('mongoose')

//Schema para a tabela
const categorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Category', categorySchema)