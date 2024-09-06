//imports
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

//função que codifica as informações passadas
const codeAuth = (data) => {
    return jwt.sign(data, secretKey)
}

//função que decodifica as informações passadas
const decodeAuth = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = { codeAuth, decodeAuth }