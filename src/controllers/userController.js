const User = require('../model/User')
const { createToken } = require('../middlewares/authMiddleware')
const auth = require('../middlewares/authService')

const createUser = async (req, res) => {
    const { user, password, addInfo } = req.body

    try {
        const validUser = await User.find({
            user: user
        })
        
        if ( validUser.length >= 1 ) {
            res.status(406).send({ "Error to create user": "Username already in use!" })
        } else {
            const newUser = new User({ 
                id_api: Date.now(),
                user: user, 
                password: password, 
                admin: false, 
                addInfo: addInfo 
            })
            await newUser.save()
            res.status(201).send(newUser)
        }
        
    } catch (err) {
        res.status(500).send({ "Error to create user": err })
    }
}

const createUserAdmin = async (req, res) => {
    const { user, password, admin, addInfo } = req.body

    try {
        const validUser = await User.find({
            user: user
        })
        
        if ( validUser.length >= 1 ) {
            res.status(406).send({ "Error to create user": "Username already in use!" })
        } else {
            const newUser = new User({ 
                id_api: Date.now(),
                user: user, 
                password: password, 
                admin: admin, 
                addInfo: addInfo 
            })
            await newUser.save()
            res.status(201).send(newUser)
        }
        
    } catch (err) {
        res.status(500).send({ "Error to create user": err })
    }
}

const listAllUsers = async (req, res) => {
    try {
        const listUsers = await User.find()
        res.status(200).send(listUsers)
    } catch (err) {
        res.status(500).send({ "Error to list users": err })
    }
}

const getUser = async (req, res) => {
    const { user, password } = req.body

    try {
        const validUser = await User.find({
            user: user, 
            password: password
        })

        if (validUser.length <= 0) {
            res.status(404).send({ err: "User not found!" })
        } else {
            let authToken = createToken(validUser[0])
            res.status(200).send( authToken )
        }
    } catch (err) {
        res.status(500).send({ "Error to find user": err })
    }
}

const updateAllUser = async (req, res) => {
    const { id } = req.params
    const { user, password, admin, addInfo } = req.body
    
    try {
        const updatedUser = await User.findOneAndUpdate({ id_api: id },{ 
            user: user, 
            password: password, 
            admin: admin, 
            addInfo: addInfo 
        })

        if (!updatedUser) {
            res.status(404).send({ err: "User not found" })
        } else {
            res.status(200).send(updatedUser)
        }

    } catch (err) {
        res.status(500).send({ "Error to update user": err })
    }
}

const updateUser = async (req, res) => {
    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])

    const { user, password, addInfo } = req.body
    
    try {
        const updatedUser = await User.findOneAndUpdate({ id_api: credential.id },{ 
            user: user, 
            password: password, 
            admin: false, 
            addInfo: addInfo 
        })

        if (!updatedUser) {
            res.status(404).send({ err: "User not found" })
        } else {
            res.status(200).send(updatedUser)
        }

    } catch (err) {
        res.status(500).send({ "Error to update user": err })
    }
}

const deleteUser = async (req, res) => {
    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])

    try {
        const deletedUser = await User.findOneAndDelete({ id_api: credential.id })

        if (!deletedUser) {
            res.status(404).send({ err: "User not found"})
        } else {
            res.status(200).send(deletedUser)
        }

    } catch (err) {
        res.status(500).send({ "Error to delete user": err})
    }
}

const deleteAllUser = async (req, res) => {
    const { id } = req.params

    try {
        const deletedUser = await User.findOneAndDelete({ id_api: id })

        if (!deletedUser) {
            res.status(404).send({ err: "User not found"})
        } else {
            res.status(200).send(deletedUser)
        }

    } catch (err) {
        res.status(500).send({ "Error to delete user": err})
    }
}

module.exports = { createUser, listAllUsers, getUser, updateUser, deleteUser, createUserAdmin, updateAllUser, deleteAllUser }