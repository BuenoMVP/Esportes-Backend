//Imports
const mongoose = require('mongoose')

//Schema para a tabela
const esportesSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    players: {
        type: Number, 
        required: true
    },
    time: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Esportes', esportesSchema)