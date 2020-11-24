/**
 * @fileoverview Swagger UI server.
 */

const expressSwagger = require('express-swagger-generator')
const path = require('path')
const config = require('../config')

/**
 * Return the current swagger host.
 */
const getSwaggerHost = () => {
  let host
  config.app.isDev
    ? (host = `${config.app.host}:${config.app.port}`)
    : (host = config.app.host)
  return host
}

/**
 * General swagger settings
 */
const swaggerConf = {
  route: {
    url: '/docs',
    docs: '/docs.json',
  },
  swaggerDefinition: {
    info: {
      title: 'Habit',
      version: '1.0.0',
      description: 'REST API to handle Habit web APP.',
    },
    host: getSwaggerHost(),
    basePath: '/api',
    produces: ['application/json'],
    schemes: config.app.isDev ? ['http'] : ['https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT client session authentication.',
      },
    },
  },
  basedir: path.join(__dirname, '../api'),
  files: ['./**/*.js', './*.js'],
}

/**
 * Generates a swagger json file and create
 * the ui-swagger service on `host/api-docs`
 * @param {express.Application} app
 */
module.exports = (app) => {
  const swaggerService = expressSwagger(app)
  swaggerService(swaggerConf)
}
