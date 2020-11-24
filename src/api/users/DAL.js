/**
 * @fileoverview Data Acces Layer.
 * Operations to perform CRUD and custom
 * DB operations, to manage the bussines logic.
 */

const { db } = require('../../db')
const { ApiError, httpSatus } = require('../../utils')

const raiseError = (status, message) => {
  return Promise.reject(new ApiError(status, message))
}

const Users = db('users')

/**
 * Create a new user only if the user | email does not exists
 * @param {object} newUser - New user data
 */
exports.createOne = async ({ username, email, password, fullName }) => {
  const userExists = await Users
    .where('username', username).orWhere('email', email).first()
  if (userExists) {
    userExists.username === username
      ? raiseError(httpSatus.conflict, 'Username already exists')
      : raiseError(httpSatus.conflict, 'Email already exists')
  }
  await Users.insert({ username, email, password, fullName })
  return Users.where('username', username).first()
}

/**
 * Find a user by username field
 * @param {object} username - User-username
 */
exports.findByUsername = async ({ username }) => {
  const user = await Users.where('username', username).first()
  if (!user) raiseError(httpSatus.notFound, 'User not found')
  return user
}

/**
 * Find a user by email field
 * @param {object} email - User email
 */
exports.findByEmail = async ({ email }) => {
  const user = await Users.where('email', email).first()
  if (!user) raiseError(httpSatus.notFound, 'User not found')
  return user
}

/**
 * Find a user by id field
 * @param {object} id - User id
 */
exports.findById = async ({ id }) => {
  const user = await Users.where('id', id).first()
  if (!user) raiseError(httpSatus.notFound, 'User not found')
  return user
}

/**
 * Update a user
 * @param {object} updateData - User id and data to update
 */
exports.updateOne = async ({ id, data }) => {
  const keys = Object.keys(data)
  const toUpdate = {}
  keys.forEach((key) => {
    if (data[key] !== undefined) toUpdate[key] = data[key]
  })
  await Users.where('id', id).update(toUpdate)
  return Users.where('id', id).first()
}

/**
 * Find a user by id field
 * @param {object} id - User id
 */
exports.deleteOne = async ({ id }) => {
  await Users.where('id', id).delete()
}

/**
 * Create a new refresh token and reference it with one user.
 * @param {object} tokenInfo - Token needed info
 */
exports.createRefreshToken = async ({ refreshToken, username }) => {
  try {
    await db('tokens').insert({ token: refreshToken, username })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Create a new refresh token and reference it with one user.
 * @param {object} tokenInfo - Token needed info
 */
exports.findRefreshToken = async ({ refreshToken }) => {
  try {
    return db('tokens').where({ token: refreshToken }).first()
  } catch (error) {
    return Promise.reject(error)
  }
}
