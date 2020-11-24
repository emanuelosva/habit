/**
 * @fileoverview Server declaration
 */

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { swaggerUi } = require('./utils')
const { loggerRequest, notFoundHandler, errorHandler } = require('./middleware')
const apiRouter = require('./api')

/**
 * App instance
 */
const app = express()

/**
 * Security
 */
app.use(helmet({
  contentSecurityPolicy: false,
}))
app.use(cors())

/**
 * Parsers
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Middlewares
 */
app.use(loggerRequest)

/**
 * API router
 */
swaggerUi(app)
app.use('/api', apiRouter)

/**
 * Error Handlers
 */
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
