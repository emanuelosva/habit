/**
 * @fileoverview Data Acces Layer.
 * Operations to perform CRUD and custom
 * DB operations, to manage the bussines logic.
 */

const { db, dbUtils: { getOrUndefined } } = require('../../db')
const { raiseError, httpSatus } = require('../../utils')

const Users = db('users')
const USER_FIELDS = [
  'id', 'email', 'username', 'fullName', 'isPublic', 'picture', 'biography', 'joinedAt',
]

/**
 * Create a new user only if the user | email does not exists
 * @param {object} newUser - New user data
 */
exports.createOne = async ({ username, email, password, fullName }) => {
  try {
    const user = await Users.insert({ username, email, password, fullName }, USER_FIELDS)
    return user
  } catch (error) {
    if (error.constraint.split('_') === 'email') {
      return raiseError(httpSatus.conflict, 'Email already exists')
    }
    return raiseError(httpSatus.conflict, 'Username already exists')
  }
}

/**
 * Find a user by username field
 * @param {object} username - User-username
 */
exports.findByUsername = async ({ username }) => {
  const user = await Users.select(USER_FIELDS).where('username', username).first()
  if (getOrUndefined(user)) return user
  raiseError(httpSatus.notFound, 'User not found')
}

/**
 * Find a user by email field
 * @param {object} email - User email
 */
exports.findByEmail = async ({ email }) => {
  const user = await Users.where('email', email).first()
  return getOrUndefined(user)
}

/**
 * Find a user by id field
 * @param {object} id - User id
 */
exports.findById = async ({ id }) => {
  const user = await Users.select(USER_FIELDS).where('id', id).first()
  if (getOrUndefined(user)) return user
  raiseError(httpSatus.notFound, 'User not found')
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
  const [user] = await Users.where('id', id).update(toUpdate, USER_FIELDS)
  if (getOrUndefined(user)) return user
  return raiseError(httpSatus.notFound, 'User not found')
}

/**
 * Update a user
 * @param {object} updateData - User id and data to update
 */
exports.setToVerified = async ({ username }) => {
  const toUpdate = { isVerified: true }
  const [user] = await Users.where('username', username).update(toUpdate, USER_FIELDS)
  if (getOrUndefined(user)) return user
  return raiseError(httpSatus.notFound, 'User not found')
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
    const token = await db('tokens').where({ token: refreshToken }).first()
    return getOrUndefined(token)
  } catch (error) {
    return Promise.reject(error)
  }
}
