/**
 * @fileoverview JWT implementation
 */

const config = require('../config')
const jwt = require('jsonwebtoken')
const randToken = require('rand-token')
const { promisify } = require('util')
const { httpSatus, ApiError } = require('../utils')

const defaulExpirationTime = '2 days'

/**
 * Encode a object in a JWT
 * @param {object} payload - Object to encode
 * @param {string|Date} expiration - Expiration time
 */
exports.sign = async (payload, expiration) => {
  if (!payload.username || !payload.type || !payload.scope) {
    throw new Error('Payload must contain properties: [username, type, scope]')
  }
  const sign = promisify(jwt.sign)
  return sign(payload, config.auth.secret, {
    algorithm: config.auth.algorithms[0],
    expiresIn: expiration || defaulExpirationTime,
  })
}

/**
 * Verify a JWT and return its payload
 * @param {string} token - JWT token to verify and decode
 */
exports.verify = async (token) => {
  const verify = promisify(jwt.verify)
  try {
    const payload = await verify(token, config.auth.secret, {
      algorithms: config.auth.algorithms,
    })
    return payload
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return Promise.reject(new ApiError(httpSatus.unauthorized, 'Session expired'))
    }
    return Promise.reject(new ApiError(httpSatus.unauthorized))
  }
}

/**
 * Generate a randon refresh token
 */
exports.generateRefreshToken = async () => {
  return randToken.uid(128)
}
