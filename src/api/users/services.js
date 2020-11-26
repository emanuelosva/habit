/**
 * @fileoverview Services Layer.
 * Manage the custom bussines logic for each
 * endpoint controller.
 */

const bcrypt = require('bcrypt')
const { User, Token } = require('./DAL')
const { ApiError, httpSatus } = require('../../utils')
const { jwt, tokenTypes } = require('../../auth')
const scopes = require('../../auth/scopes')

/**
 * Create a new user.
 */
exports.signup = async ({ username, email, password, fullName }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
    })
    await user.save()
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
    if (type !== tokenTypes.mail) {
      throw new ApiError(httpSatus.forbidden, 'Invalid token')
    }
    return User.setToVerified(username)
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Validate credentials, create tokens and return user.
 */
exports.login = async ({ email, password }) => {
  try {
    const user = await User.findByEmail(email)
    const correctPassword = user && await bcrypt.compare(password, user.password)
    if (user && correctPassword) {
      if (!user.isVerified) {
        const FiveDaysInMiliseconds = 86400 * 5 * 1000
        const timeFromSignupWithoutVerify = +new Date() - +new Date(user.joinedAt)
        if (timeFromSignupWithoutVerify > FiveDaysInMiliseconds) {
          throw new ApiError(httpSatus.forbidden, 'The ccount needs to be verified')
        }
      }
      const accessToken = await jwt.sign({
        username: user.username,
        type: tokenTypes.auth,
        scope: scopes.user,
      })
      const refreshToken = await jwt.generateRefreshToken()
      const token = new Token({ refreshToken, username: user.username })
      await token.save()
      delete user.password
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
    const token = await Token.findOne(refreshToken)
    if (token && token.isValid && token.username === username) {
      const user = await User.findByUsername(username)
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
    return User.updateOne(id, updateData)
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Delete one user.
 */
exports.deleteOne = async ({ id }) => {
  try {
    await User.deleteOne(id)
  } catch (error) {
    return Promise.reject(error)
  }
}
