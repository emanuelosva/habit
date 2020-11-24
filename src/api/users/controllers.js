/**
 * @fileoverview Controller Layer.
 * Manage the request operation, get and prepare data
 * and return the proper response or manage the error.
 */

const response = require('../../response')
const userService = require('./services')

/**
 * Handle signup request.
 */
exports.signup = async (req, res, next) => {
  const signupData = req.body
  userService.signup(signupData)
    .then((data) => response.seccess(req, res, 201, data, 'User created'))
    .catch(next)
}

/**
 * Handle verify email request.
 */
exports.verifyEmail = async (req, res, next) => {
  const { emailToken } = req.body
  userService.verifyEmail({ emailToken })
    .then((data) => response.seccess(req, res, 200, data, 'Account verified'))
    .catch(next)
}

/**
 * Handle login request.
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body
  userService.login({ email, password })
    .then((data) => response.seccess(req, res, 200, data, 'Account verified'))
    .catch(next)
}

/**
 * Handle refresh token request.
 */
exports.refreshToken = async (req, res, next) => {
  const { username, refreshToken } = req.body
  userService.refreshToken({ username, refreshToken })
    .then((data) => response.seccess(req, res, 200, data, 'New token'))
    .catch(next)
}

/**
 * Handle get current user request.
 */
exports.getCurrentUser = async (req, res, next) => {
  const { user } = req
  response.seccess(req, res, 200, user, 'Current user info')
}

/**
 * Handle update one request.
 */
exports.updateOne = async (req, res, next) => {
  const { user: { id } } = req
  const updateData = req.body
  userService.updateOne({ id, updateData })
    .then((data) => response.seccess(req, res, 200, data, 'User updated'))
    .catch(next)
}

/**
 * Handle update one request.
 */
exports.deleteOne = async (req, res, next) => {
  const { user: { id } } = req
  userService.deleteOne({ id })
    .then((data) => response.seccess(req, res, 200, data, 'User deleted'))
    .catch(next)
}
