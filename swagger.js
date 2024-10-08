//Imports
const autogen = require('swagger-autogen')({openapi: '3.0.0'})

//Definição do arquivo .json e dos endpoints
const output = './swagger_doc.json'
const endpoints = [ './src/server.js' ]

//Especificações do swagger
const doc = {
    info: {
      title: 'Projeto Final de Back-End',
      description: 'Documentação das rotas presentes no projeto final utilizando o Swagger'
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