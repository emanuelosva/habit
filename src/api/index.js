/**
 * @fileoverview API general router
 */

const { Router } = require('express')
const usersApi = require('./users/routes')
const habitsApi = require('./users/routes')
const statsApi = require('./users/routes')

/**
 * General router
 */
const apiRouter = Router()

/**
 * Route handlers
 */
apiRouter.use('/users', usersApi)
apiRouter.use('/habits', habitsApi)
apiRouter.use('/stats', statsApi)

module.exports = apiRouter
