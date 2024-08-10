const Esportes = require('../model/Esportes')

const createEsporte = async (req, res) => {
    const { name, players, time } = req.body
    
    try {
        const newEsporte = new Esportes({ name, players, time})
        await newEsporte.save()
        res.status(201).send(newEsporte)
    } catch (err) {
        res.status(500).send({ "Error to create esporte": err })
    }
}

const listAllEsportes = async (req, res) => {
    try {
        const listEsportes = await Esportes.find()
        res.status(200).send(listEsportes)
    } catch (err) {
        res.status(500).send({ "Error to list esportes": err })
    }
}

const updateEsporte = async (req, res) => {
    const { id } = req.params
    const { name, players, time } = req.body
    
    try {
        const updatedEsporte = await Esportes.findOneAndUpdate(
            { _id: id },
            { name, players, time },
            { new: true, runValidators: true }
        )

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