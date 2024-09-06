//imports
const auth = require('../middlewares/authService')
const Esportes = require('../model/Esportes')
const Category = require('../model/Category')

//função para criar um esporte
const createEsporte = async (req, res) => {
    // #swagger.tags = ['API']
    // #swagger.summary = 'Criação de Esportes'
    // #swagger.description = 'Rota responsável por criar os esportes na conta do usário autenticado'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])
    
    const { name, players_number, type } = req.body
    
    try {
        const objTypes = await Category.find({ id_api: type })

        if (!objTypes) {
            res.status(404).send({Error: "Types Not Found!"})
        }

        const newEsporte = new Esportes({ 
            id_api: Date.now(),
            name: name, 
            players_number: players_number, 
            type: [...objTypes], 
            userID: credential.id
        })

        await newEsporte.save()

        res.status(201).send(newEsporte)
    } catch (err) {
        res.status(500).send({ "Error to create esporte": err })
    }
}

//função para listar todos os esportes
const listAllEsportes = async (req, res) => {
    // #swagger.tags = ['API']
    // #swagger.summary = 'ADM - Lista todos os esportes no BD'
    // #swagger.description = 'Rota responsável por listar todos os esportes no Banco. Acessível somente para ADMs'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const limit = parseInt(req.query.limite) || 5
    const pagina = parseInt(req.query.pagina) || 1
    const offset = limit * (pagina - 1)

    try {
        const listAllEsportes = await Esportes.find().skip(offset).limit(limit).populate('type')
        res.status(200).send(listAllEsportes)
    } catch (err) {
        res.status(500).send({ "Error to list esportes": err })
    }
}

//função para atualizar um esporte
const updateEsporte = async (req, res) => {
    // #swagger.tags = ['API']
    // #swagger.summary = 'Altera os esportes do usuário'
    // #swagger.description = 'Rota responsável por atualizar os esportes na conta do usário autenticado'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])

    const { id } = req.params
    const { name, players_number, type } = req.body
    
    try {
        const objTypes = await Category.find({ id_api: type })

        if (!objTypes) {
            res.status(404).send({ Error: "Types Not Found!" })
        }
        
        let updatedEsporte

        if ( credential.admin == false ) {
            updatedEsporte = await Esportes.findOneAndUpdate({ id_api: id, userID: credential.id },{ 
                name: name, 
                players_number: players_number, 
                type: [...objTypes], 
                userID: credential.id
            })
        } else {
            updatedEsporte = await Esportes.findOneAndUpdate({ id_api: id },{ 
                name: name, 
                players_number: players_number, 
                type: [...objTypes]
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

//função para deletar um esporte
const deleteEsporte = async (req, res) => {
    // #swagger.tags = ['API']
    // #swagger.summary = 'Deleta os esportes do usuário'
    // #swagger.description = 'Rota responsável por deketar os esportes na conta do usário autenticado'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])

    const { id } = req.params

    try {
        let deletedEsporte

        if ( credential.admin == false ) {
            deletedEsporte = await Esportes.findOneAndDelete({ id_api: id, userID: credential.id })
        } else {
            deletedEsporte = await Esportes.findOneAndDelete({ id_apí: id })
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

//função para filtrar os esportes por categoria
const listEsportesByCategory = async (req, res) => {
    // #swagger.tags = ['Feature']
    // #swagger.summary = 'ADM - Lista, por categoria, todos os esportes do BD'
    // #swagger.description = 'Rota responsável por filtrar os esportes por categoria no Banco. Acessível somente para ADMs'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const limit = parseInt(req.query.limite) || 5
    const pagina = parseInt(req.query.pagina) || 1
    const offset = limit * (pagina - 1)

    const { type } = req.body

    try {
        const typesList = await Category.find({ id_api: type })
        
        if (!typesList) {
            res.status(404).send({ Error: "Types Not Found!" })
        }
        
        const listEsportesByCategory = await Esportes.find({ type: typesList }).skip(offset).limit(limit).populate('type')

        if (listEsportesByCategory.length > 0)
            res.status(200).send(listEsportesByCategory)
        else
            res.status(404).send({ Error: "Esportes by Category Not Found!" })

    } catch (err) {
        res.status(500).send({ "Error to list esportes by category": err })
    }
}

//função para listar os esportes por usuário
const listEsportesByUser = async (req, res) => {
    // #swagger.tags = ['API']
    // #swagger.summary = 'Lista os esportes do usuário'
    // #swagger.description = 'Rota responsável por listar os esportes na conta do usário autenticado'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const limit = parseInt(req.query.limite) || 5
    const pagina = parseInt(req.query.pagina) || 1
    const offset = limit * (pagina - 1)

    const token = req.headers['authorization'].split(" ")
    const credential = auth.decodeAuth(token[1])

    try {
        const listEsportesByUser = await Esportes.find({ userID: credential.id }).skip(offset).limit(limit).populate('type')

        if (listEsportesByUser.length > 0)
            res.status(200).send(listEsportesByUser)
        else
            res.status(404).send({ Error: "Esportes by User Not Found!" })

    } catch (err) {
        res.status(500).send({ "Error to list esportes by user": err })
    }
}

module.exports = { createEsporte, listAllEsportes, updateEsporte, deleteEsporte, listEsportesByCategory, listEsportesByUser }