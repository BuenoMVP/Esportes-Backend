const Login = require('../model/Login')

const createUser = async (req, res) => {
    const { user, password, admin, addInfo } = req.body
    
    try {
        const newUser = new Login({ user, password, admin, addInfo })
        await newUser.save()
        res.status(201).send(newUser)
    } catch (err) {
        res.status(500).send({ "Error to create user": err })
    }
}

const listAllUsers = async (req, res) => {
    try {
        const listUsers = await Login.find()
        res.status(200).send(listUsers)
    } catch (err) {
        res.status(500).send({ "Error to list users": err })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { user, password, admin, addInfo } = req.body
    
    try {
        const updatedUser = await Login.findOneAndUpdate(
            { _id: id },
            { user, password, admin, addInfo },
            { new: true, runValidators: true }
        )

        if (!updatedUser) {
            res.status(404).send({ err: "User not found" })
        }

        res.status(200).send(updatedUser)
    } catch (err) {
        res.status(500).send({ "Error to update user": err })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const deletedUser = await Login.findOneAndDelete({ _id: id })

        if (!deletedUser) {
            res.status(404).send({ err: "User not found"})
        }

        res.status(200).send(deletedUser)
    } catch (err) {
        res.status(500).send({ "Error to delete user": err})
    }
}

module.exports = { createUser, listAllUsers, updateUser, deleteUser }