/**
 * @fileoverview Handle 404 error.
 */

const { httpSatus, ApiError } = require('../utils')

/**
 * Handle 404 error.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */
module.exports = (req, res, next) => {
  try {
    throw new ApiError(httpSatus.notFound, 'Url not found')
  } catch (error) {
    next(error)
  }
}
