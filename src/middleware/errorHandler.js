/**
 * @fileoverview Error Handler
 */

const response = require('../response')
const { ApiError, httpSatus } = require('../utils')

/**
 * Handle any api error
 * @param {ApiError|Error} err - Error instance
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next Function
 */
module.exports = async (err, req, res, next) => {
  let error = err
  if (!(err instanceof ApiError)) {
    error = new ApiError(httpSatus.serverError, err.message)
    error.stack = err.stack
    await error.toOperationalError()
    await error.sendEmailAdminIfOperational()
  }
  await error.outputLog()
  return response.error(req, res, error.status, {}, error.message)
}
