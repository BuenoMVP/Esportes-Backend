//Imports
const mongoose = require('mongoose')
const bd_passwd = process.env.BD_PASSWORD

//Conexão com o BD
async function connection() {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(`mongodb+srv://marcos_vbp:${bd_passwd}@cluster0.tr0f0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('MongoDB connected')
    } catch (err) {
        console.error('Erro connecting to DB: ' + err)
        process.exit(1)
    }
}

module.exports = connection