const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const createToken = (user) => {
    let { _id, admin } = user

    let token = jwt.sign({ _id: _id, admin: admin }, secretKey)

    if (admin) {
        return { admin: admin, token: token }
    } else {
        return { admin: admin, token: token } 
    }
}

const verifyToken = (req, res, next) => {
    let bearToken = req.headers['authorization'] || ""
    let token = bearToken.split(" ")

    try {
        if (token[0] == 'Bearer') {
            token = token[1]
            const credentials = jwt.verify(token, secretKey)
            console.log(credentials)
            credentials ? next() : res.json({ error: 'You do not have permission to access this page!'})
            
        } else {
            res.status(401).json({ error: 'Invalid token'})
        }

    } catch (error) {
        res.status(403).json({ error: 'Token inválido: ' + error })
    }
}

const verifyTokenAdmin = (req, res, next) => {
    let bearToken = req.headers['authorization'] || ""
    let token = bearToken.split(" ")

    try {
        if (token[0] == 'Bearer') {
            token = token[1]
            const credentials = jwt.verify(token, secretKey)
            console.log(credentials)
            credentials.admin ? next() : res.status(403).json({ error: 'You do not have permission to access this page!'})
            
        } else {
            res.status(401).json({ error: 'Invalid token'})
        }

    } catch (error) {
        res.status(403).json({ error: 'Token inválido: ' + error })
    }
}

module.exports = { createToken, verifyToken, verifyTokenAdmin }