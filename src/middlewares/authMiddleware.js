//import
const auth = require('./authService')

//função para criação do token
const createToken = (user) => {
    let { id_api, admin } = user

    let token = auth.codeAuth({ id: id_api, admin: admin })//codificação das informações

    if (admin) {
        return { admin: admin, token: token }
    } else {
        return { admin: admin, token: token } 
    }
}

//middleware para verificar se o usuário possui um token válido
const verifyToken = (req, res, next) => {
    //recebe o token informado
    let bearToken = req.headers['authorization'] || ""
    let token = bearToken.split(" ")

    try {
        if (token[0] == 'Bearer') {
            token = token[1]
            const credentials = auth.decodeAuth(token)//verifica se é válido
            credentials ? next() : res.json({ error: 'You do not have permission to access this page!'})
            
        } else {
            res.status(401).json({ error: 'Invalid token'})
        }

    } catch (error) {
        res.status(403).json({ error: 'Token inválido: ' + error })
    }
}

//middleware para verificar se o usuário possui um token válido e permissão de administrador
const verifyTokenAdmin = (req, res, next) => {
    //recebe o token informado
    let bearToken = req.headers['authorization'] || ""
    let token = bearToken.split(" ")

    try {
        if (token[0] == 'Bearer') {
            token = token[1]
            const credentials = auth.decodeAuth(token)//verifica se é válido
            credentials.admin ? next() : res.status(403).json({ error: 'You do not have permission to access this page!'})
            
        } else {
            res.status(401).json({ error: 'Invalid token'})
        }

    } catch (error) {
        res.status(403).json({ 'Invalid token': error })
    }
}

module.exports = { createToken, verifyToken, verifyTokenAdmin }