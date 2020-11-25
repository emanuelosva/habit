/**
 * @fileoverview Authorization middleware.
 */

const { jwt, scopes, tokenTypes } = require('../auth')
const { ApiError, httpSatus } = require('../utils')
const { db } = require('../db')

const validScopes = Object.values(scopes)

/**
 * Authentication middleware.
 * Check if the authorization header is sent and
 * contain a valid JWT.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next Next function
 */
exports.isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers || !req.headers.authorization) {
      return next(new ApiError(httpSatus.forbidden))
    }
    const token = req.headers.authorization.split('Bearer ')[1]
    const { username, type, scope } = await jwt.verify(token).catch(next)
    if (!username || type !== tokenTypes.auth || !validScopes.indexOf(scope)) {
      return next(new ApiError(httpSatus.unauthorized))
    }
    const user = await db('users').where('username', username).first()
    if (user === 'undefined') return next(new ApiError(httpSatus.unauthorized))
    delete user.password
    Object.assign(user, { scope })
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * Check if the current user hae the neede permissions.
 * @param {Array} scopes - Array with scopes
 */
exports.checkScopes = (resourceScopes) => {
  return (req, res, next) => {
    if (resourceScopes.indexOf(req.user.scope)) {
      return next()
    }
    return next(new ApiError(httpSatus.forbidden))
  }
}
