const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const codeAuth = (data) => {
    return jwt.sign(data, secretKey)
}

const decodeAuth = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = { codeAuth, decodeAuth }