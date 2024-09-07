//Imports
const mongoose = require('mongoose')

//Schema para a tabela
const userSchema = new mongoose.Schema({
    id_api: {
        type: String,
        required: true
    },
    user: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    acessos: {
        type: Number,
        required: true
    },
    addInfo: {
        type: String, 
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)