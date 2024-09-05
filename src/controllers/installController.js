const Esportes = require('../model/Esportes')
const User = require('../model/User')
const Category = require('../model/Category')

const install = async (req, res) => {
    // #swagger.tags = ['Install']
    // #swagger.summary = 'Instalar Banco de Dados'
    // #swagger.description = 'Rota responsável por criar as tabelas e registros no Banco do usuário'
    try {
        const users = [
            {
                id_api: 'AA1',
                user: 'admin',
                password: 'admin',
                admin: true,
                addInfo: 'Administrador da api'
            },
            {
                id_api: 'AA2',
                user: 'user1',
                password: 'user1',
                admin: false,
                addInfo: 'Usuario normal da api'
            },
            {
                id_api: 'AA3',
                user: 'user2',
                password: 'user2',
                admin: false,
                addInfo: 'Usuario normal da api'
            },
            {
                id_api: 'AA4',
                user: 'user3',
                password: 'user3',
                admin: false,
                addInfo: 'Usuario normal da api'
            },
            {
                id_api: 'AA5',
                user: 'user4',
                password: 'user4',
                admin: false,
                addInfo: 'Usuario normal da api'
            }
        ] 
    
        const esportes = [
            {
                id_api: 'BB1',
                name: 'Futebol',
                players_number: 22,
                type: ['CC2', 'CC3', 'CC5'],
                userID: 'AA2'
            },
            {
                id_api: 'BB2',
                name: 'Volei',
                players_number: 12,
                type: ['CC1', 'CC5'],
                userID: 'AA3'
            },
            {
                id_api: 'BB3',
                name: 'Natação',
                players_number: 6,
                type: ['CC4'],
                userID: 'AA4'
            },
            {
                id_api: 'BB4',
                name: 'Basquete',
                players_number: 12,
                type: ['CC1', 'CC3'],
                userID: 'AA5'
            },
            {
                id_api: 'BB5',
                name: 'Luta',
                players_number: 2,
                type: ['CC3', 'CC5'],
                userID: 'AA5'
            }
        ]
    
        const categories = [
            {
                id_api: 'CC1',
                name: 'Quadra',
                description: 'Esportes em quadra'
            },
            {
                id_api: 'CC2',
                name: 'Campo',
                description: 'Esportes em campo'
            },
            {
                id_api: 'CC3',
                name: 'Fisico',
                description: 'Esportes com atividade física'
            },
            {
                id_api: 'CC4',
                name: 'Aquatico',
                description: 'Esportes que envolvem água'
            },
            {
                id_api: 'CC5',
                name: 'Terrestre',
                description: 'Esportes em terra firme'
            }
        ]
    
       await User.insertMany(users)
    
       await Category.insertMany(categories)
    
       esportes.map( async (esporte) => {
        const types = await Category.find({ id_api: esporte.type })
    
        const newEsporte = new Esportes({ 
            id_api: esporte.id_api,
            name: esporte.name, 
            players_number: esporte.players_number, 
            type: [...types], 
            userID: esporte.userID
        })
    
        await newEsporte.save()
       })

       res.status(201).send({"Success": "DataBase created!"})
    } catch (err) {
       res.status(400).send({"DataBase not created": err })
    }
}

module.exports = { install }