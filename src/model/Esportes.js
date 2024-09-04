//Imports
const mongoose = require('mongoose')

//Schema para a tabela
const esportesSchema = new mongoose.Schema({
    id_api: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    players_number: {
        type: Number, 
        required: true
    },
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Esportes', esportesSchema)