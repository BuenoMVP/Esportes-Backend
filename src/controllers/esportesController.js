//imports
const auth = require('../middlewares/authService')
const Esportes = require('../model/Esportes')
const categorySchema = require('../model/Category')

const createEsporte = async (req, res) => {
    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])
    
    const { name, players_number, type } = req.body
    
    try {
        const objTypes = await categorySchema.find({_id: type})

        if (!objTypes) {
            res.status(404).send({Error: "Types Not Found!"})
        }

        const newEsporte = new Esportes({ 
            name: name, 
            players_number: players_number, 
            type: [...objTypes], 
            userID: credential._id
        })

        await newEsporte.save()

        res.status(201).send(newEsporte)
    } catch (err) {
        res.status(500).send({ "Error to create esporte": err })
    }
}

const listAllEsportes = async (req, res) => {
    try {
        const listAllEsportes = await Esportes.find().populate('type')
        res.status(200).send(listAllEsportes)
    } catch (err) {
        res.status(500).send({ "Error to list esportes": err })
    }
}

const updateEsporte = async (req, res) => {
    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])

    const { id } = req.params
    const { name, players_number, type } = req.body
    
    try {
        const objTypes = await categorySchema.find({_id: type})

        if (!objTypes) {
            res.status(404).send({ Error: "Types Not Found!" })
        }
        
        let updatedEsporte

        if ( credential.admin == false ) {
            updatedEsporte = await Esportes.findOneAndUpdate({_id: id, userID: credential._id},{ 
                name: name, 
                players_number: players_number, 
                type: [...objTypes], 
                userID: credential._id
            })
        } else {
            updatedEsporte = await Esportes.findOneAndUpdate({_id: id},{ 
                name: name, 
                players_number: players_number, 
                type: [...objTypes], 
                userID: credential._id
            })
        }

        if (!updatedEsporte) {
            if (credential.admin == false) 
                res.status(404).send({ err: "Esporte not found on your account" })
            else
                res.status(404).send({ err: "Esporte not found on DataBase" })
        } else {
            res.status(200).send(updatedEsporte)
        }

    } catch (err) {
        res.status(500).send({ "Error to update esporte": err })
    }
}

const deleteEsporte = async (req, res) => {
    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])

    const { id } = req.params

    try {
        let deletedEsporte

        if ( credential.admin == false ) {
            deletedEsporte = await Esportes.findOneAndDelete({ _id: id, userID: credential._id })
        } else {
            deletedEsporte = await Esportes.findOneAndDelete({ _id: id })
        }

        if (!deletedEsporte) {
            if (credential.admin == false) 
                res.status(404).send({ err: "Esporte not found on your account" })
            else
                res.status(404).send({ err: "Esporte not found on DataBase" })
        } else {
            res.status(200).send(deletedEsporte)
        }

    } catch (err) {
        res.status(500).send({ "Error to delete esporte": err })
    }
}

module.exports = { createEsporte, listAllEsportes, updateEsporte, deleteEsporte }