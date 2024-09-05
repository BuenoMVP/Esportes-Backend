const autogen = require('swagger-autogen')()

const output = './swagger_doc.json'
const endpoints = [ './src/server.js' ]

const doc = {
    info: {
      title: 'Projeto Final de Back-End',
      description: 'Documentação das rotas presentes no prjeto final utilizando o Swagger'
    },
    components: {
      securitySchemes:{
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              in: 'header',
          }
      }
  }
  }

autogen(output, endpoints, doc)