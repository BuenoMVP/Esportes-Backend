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

module.exports = { createToken }