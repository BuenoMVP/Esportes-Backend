//imports
const User = require('../model/User')
const { createToken } = require('../middlewares/authMiddleware')
const auth = require('../middlewares/authService')

//função para criar um usuário
const createUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Criar usuário'
    // #swagger.description = 'Rota responsável por criar as credenciais de login para um novo usuário'
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

//função para criar um usuário administrador
const createUserAdmin = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'ADM - Criar administrador da API'
    // #swagger.description = 'Rota responsável por criar os administradores da API. Acessível somente por ADMs'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
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

//função para listar todos os usuários
const listAllUsers = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'ADM - Listar todos os usuário cadastrados'
    // #swagger.description = 'Rota responsável por listar todos os usuários cadastrados na aplicação. Acessível somente por ADMs'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const limit = parseInt(req.query.limite) || 5
    const pagina = parseInt(req.query.pagina) || 1
    const offset = limit * (pagina - 1)

    try {
        const listUsers = await User.find().skip(offset).limit(limit)
        res.status(200).send(listUsers)
    } catch (err) {
        res.status(500).send({ "Error to list users": err })
    }
}

//função para realizar o login de um usuário
const getUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Fazer login na API'
    // #swagger.description = 'Rota responsável por realizar a validação e entrega do token de acesso ao usuário'
    const { user, password } = req.body

    try {
        const validUser = await User.find({
            user: user, 
            password: password
        })

        if (validUser.length <= 0) {
            res.status(404).send({ err: "User not found!" })
        } else {
            const id_user = validUser[0].id_api
            const acessos = validUser[0].acessos + 1
            const acessUser = await User.findOneAndUpdate({ id_api: id_user }, { acessos: acessos })
            let authToken = createToken(validUser[0])
            res.status(200).send( authToken )
        }
    } catch (err) {
        res.status(500).send({ "Error to find user": err })
    }
}

//função para atualizar os usuários cadastrados
const updateAllUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'ADM - Atualizar usuários da API'
    // #swagger.description = 'Rota responsável por atulizar as informações e permissões dos usuários cadastrados na API. Acessível somente por ADMs'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
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

//função para atualizar as informações do usuário
const updateUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Atualizar dados do usuário'
    // #swagger.description = 'Rota responsável por atualizar as informações pessoais do usuário autenticado'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
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

//função para deletar as informações do usuário
const deleteUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Deletar dados do usuário'
    // #swagger.description = 'Rota responsável por deletar os dados do usuário autenticado'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
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

//função para deletar os usuários cadastrados
const deleteAllUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'ADM - Deletar usuário da API'
    // #swagger.description = 'Rota responsável por deletar usuário cadastrados na API. Acessível somente por ADMs'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
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

const getAcessosUser = async (req, res) => {
    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])

    try {
        const acessosUser = await User.find({ id_api: credential.id })
        const login= acessosUser[0].user
        const qtd = acessosUser[0].acessos

        res.status(200).send({ "User": login, "Quantidade de acessos do usuario": qtd })
    } catch (err) {
        res.status(500).send({ "Error to update user": err })
    }
}

module.exports = { createUser, listAllUsers, getUser, updateUser, deleteUser, createUserAdmin, updateAllUser, deleteAllUser, getAcessosUser }