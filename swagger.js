const autogen = require('swagger-autogen')()

const output = './swagger_doc.json'
const endpoints = [ './src/server.js' ]

const doc = {
    info: {
      title: 'Projeto Final de Back-End',
      description: 'Documentação com Swagger'
    }
  }

autogen(output, endpoints, doc)