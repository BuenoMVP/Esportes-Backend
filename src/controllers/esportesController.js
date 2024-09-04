const Esportes = require('../model/Esportes')
const categorySchema = require('../model/Category')

const createEsporte = async (req, res) => {
    const { name, players_number, type, userID } = req.body
    
    try {
        const objTypes = await categorySchema.find({_id: type})

        if (!objTypes) {
            res.status(404).send({Error: "Types Not Found!"})
        }

        const newEsporte = new Esportes({ 
            name: name, 
            players_number: players_number, 
            type: [...objTypes], 
            userID: userID
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
    const { id } = req.params
    const { name, players_number, type, userID } = req.body
    
    try {
        const objTypes = await categorySchema.find({_id: type})

        if (!objTypes) {
            res.status(404).send({Error: "Types Not Found!"})
        }
        
        const updatedEsporte = await Esportes.findOneAndUpdate({ 
            name: name, 
            players_number: players_number, 
            type: [...objTypes], 
            userID: userID
        })

        if (!updatedEsporte) {
            res.status(404).send({ err: "Esporte not found" })
        }

        res.status(200).send(updatedEsporte)
    } catch (err) {
        res.status(500).send({ "Error to update esporte": err })
    }
}

const deleteEsporte = async (req, res) => {
    const { id } = req.params

    try {
        const deletedEsporte = await Esportes.findOneAndDelete({ _id: id })

        if (!deletedEsporte) {
            res.status(404).send({ err: "Esporte not found"})
        }

        res.status(200).send(deletedEsporte)
    } catch (err) {
        res.status(500).send({ "Error to delete esporte": err})
    }
}

module.exports = { createEsporte, listAllEsportes, updateEsporte, deleteEsporte }