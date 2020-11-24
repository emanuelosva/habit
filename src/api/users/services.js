/**
 * @fileoverview Services Layer.
 * Manage the custom bussines logic for each
 * endpoint controller.
 */

const bcrypt = require('bcrypt')
const usersDb = require('./DAL')
const { ApiError, httpSatus } = require('../../utils')
const { jwt, tokenTypes } = require('../../auth')
const scopes = require('../../auth/scopes')

/**
 * Create a new user.
 */
exports.signup = async ({ username, email, password, fullName }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await usersDb
      .createOne({ username, email, password: hashedPassword, fullName })
    const token = await jwt.sign({
      username: user.username,
      type: tokenTypes.mail,
      scope: scopes.user,
    })
    return token // TODO: Send token in email.
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Verify email token and active the account.
 */
exports.verifyEmail = async ({ emailToken }) => {
  try {
    const { username, type } = await jwt.verify(emailToken)
    const user = await usersDb.findByUsername({ username })
    if (user && type === tokenTypes.mail) {
      await usersDb.updateOne({ id: user.id, data: { isVerified: true } })
      return user
    }
    throw new ApiError(httpSatus.forbidden, 'Invalid token')
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Validate credentials, create tokens and return user.
 */
exports.login = async ({ email, password }) => {
  try {
    const user = await usersDb.findByEmail({ email })
    const correctPassword = await bcrypt.compare(password, user.password)
    if (user && correctPassword) {
      const accessToken = await jwt.sign({
        username: user.username,
        type: tokenTypes.auth,
        scope: scopes.user,
      })
      const refreshToken = await jwt.generateRefreshToken()
      await usersDb.createRefreshToken({ refreshToken, username: user.username })
      return { user, accessToken, refreshToken }
    }
    throw new ApiError(httpSatus.unauthorized, 'Invalid credentials')
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Refresh the JWT.
 */
exports.refreshToken = async ({ username, refreshToken }) => {
  try {
    const token = await usersDb.findRefreshToken({ refreshToken })
    if (token && token.isValid && token.username === username) {
      const user = await usersDb.findByUsername({ username })
      const accessToken = await jwt.sign({
        username: user.username,
        type: tokenTypes.auth,
        scope: scopes.user,
      })
      return { user, accessToken, refreshToken }
    }
    throw new ApiError(httpSatus.forbidden, 'Invalid refresh token')
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Update one user and return it.
 */
exports.updateOne = async ({ id, updateData }) => {
  try {
    await usersDb.updateOne({ id, data: updateData })
    return usersDb.findById({ id })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Delete one user.
 */
exports.deleteOne = async ({ id }) => {
  try {
    await usersDb.deleteOne({ id })
  } catch (error) {
    return Promise.reject(error)
  }
}
