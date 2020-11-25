/**
 * @fileoverview Reject promise with ApiError
 */

const ApiError = require('./ApiError')

module.exports = (status = 500, message = 'Server error') => {
  return Promise.reject(new ApiError(status, message))
}
