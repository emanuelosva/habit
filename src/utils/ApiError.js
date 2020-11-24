/**
 * @fileoverview Custom API Error.
 */

const config = require('../config')
const logger = require('./logger')
const httpSatus = require('./httpStatus')

/**
 * Api Error class.
 */
module.exports = class ApiError extends Error {
  /**
   * Create a custom Api error.
   * @param {number} status - The http error status
   * @param {string} message - The error message
   * @param {boolean} isOperational - Indicate if is client or logic error.
   */
  constructor (status, message, isOperational = false) {
    super(message)
    this.message = message || 'Server error'
    this.status = status || httpSatus.serverError
    this.isOperational = isOperational
  }

  /**
   * Mark the instance error as logic error.
   */
  async toOperationalError () {
    this.isOperational = true
    return this
  }

  /**
   * Display the error message and if is dev mode, the error stack
   */
  async outputLog () {
    logger.info(this.message)
    if (config.app.isDev) logger.error(this.stack)
    return this
  }

  /**
   * If the error is operational send a email message to
   * admin with error info.
   */
  async sendEmailAdminIfOperational () {
    if (this.isOperational) {
      logger.info('Sending message')
    }
    return this
  }
}
