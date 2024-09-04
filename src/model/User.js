//Imports
const mongoose = require('mongoose')

//Schema para a tabela
const userSchema = new mongoose.Schema({
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
    addInfo: {
        type: String, 
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)