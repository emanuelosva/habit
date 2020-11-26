/**
 * @fileoverview Data Acces Layer.
 * Operations to perform CRUD and custom
 * DB operations, to manage the bussines logic.
 */

const { db } = require('../../db')
const { raiseError, httpSatus } = require('../../utils')

const USER_FIELDS = [
  'id', 'email', 'username', 'fullName', 'isPublic', 'picture', 'biography', 'joinedAt',
]

exports.User = class User {
  constructor ({ username, email, password, fullName }) {
    this.username = username
    this.email = email
    this.password = password
    this.fullName = fullName
    this.checkFields()
  }

  /**
   * Verify the class is instantiate with all fields
   */
  checkFields () {
    if (this.username && this.email && this.password && this.fullName) {
      return this
    }
    throw new Error('All fields are required')
  }

  /**
  * Create a new user only if the user | email does not exists
  */
  async save () {
    try {
      const [user] = await db('users').insert({
        username: this.username,
        email: this.email,
        password: this.password,
        fullName: this.fullName,
      }, USER_FIELDS,
      )
      this.data = user
      return this.data
    } catch (error) {
      if (error.constraint.split('_') === 'email') {
        return raiseError(httpSatus.conflict, 'Email already exists')
      }
      return raiseError(httpSatus.conflict, 'Username already exists')
    }
  }

  /**
  * Find a user by username field
  * @param {string} username - User-username
  */
  static async findByUsername (username) {
    const data = await db('users')
      .select(USER_FIELDS)
      .where('username', username)
      .first()
    if (data) return data
    raiseError(httpSatus.notFound, `User with [username]: ${username} not found`)
  }

  /**
  * Find a user by email field
  * @param {string} email - User-email
  */
  static async findByEmail (email) {
    return db('users')
      .where('email', email)
      .first()
  }

  /**
  * Find a user by id field
  * @param {number} id - User-id
  */
  static async findById (id) {
    const data = await db('users')
      .select(USER_FIELDS)
      .where('id', id)
      .first()
    if (data) return data
    raiseError(httpSatus.notFound, `User with [id]: ${id} not found`)
  }

  /**
   * Update a user
   * @param {number} id - Unique user identifier
   * @param {object} data - The data to update
   */
  static async updateOne (id, data) {
    const keys = Object.keys(data)
    const toUpdate = {}
    keys.forEach((key) => {
      if (data[key] !== undefined) toUpdate[key] = data[key]
    })
    const [user] = await db('users')
      .where('id', id)
      .update(toUpdate, USER_FIELDS)
    if (user) return user
    return raiseError(httpSatus.notFound, 'User not found')
  }

  /**
   * Change status to account verified
   * @param {string} username - The user-username
   */
  static async setToVerified (username) {
    const toUpdate = { isVerified: true }
    const [user] = await db('users')
      .where('username', username)
      .update(toUpdate, USER_FIELDS)
    if (user) return user
    return raiseError(httpSatus.notFound, 'User not found')
  }

  /**
   * Delete a user by id
   * @param {number} id - User uniqeu idenfier
   */
  static async deleteOne (id) {
    await db('users').where('id', id).delete()
  }
}

exports.Token = class Token {
  constructor ({ refreshToken, username }) {
    this.refreshToken = refreshToken
    this.username = username
  }

  /**
   * Create a new refresh token
   */
  async save () {
    try {
      await db('tokens').insert({ token: this.refreshToken, username: this.username })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Find the desired refresh token
   * @param {string} refreshToken - The actual refres token
   */
  static async findOne (refreshToken) {
    try {
      return db('tokens').where({ token: refreshToken }).first()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
