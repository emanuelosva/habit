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
    const { username, type, role } = await jwt.verify(token).catch(next)
    if (!username || type !== tokenTypes.auth || !(role in validScopes)) {
      return next(new ApiError(httpSatus.unauthorized))
    }
    const user = await db('users').where('username', username).first()
    if (!user) return next(new ApiError(httpSatus.unauthorized))
    Object.assign(user, { role })
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
    if (req.user.role in resourceScopes) {
      return next()
    }
    return next(new ApiError(httpSatus.forbidden))
  }
}
