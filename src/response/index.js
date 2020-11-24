/**
 * @fileoverview Standard response
 */

const { httpSatus, logger } = require('../utils')

const mapCodeToMessage = {
  200: 'ok',
  201: 'created',
  400: 'bad request',
  401: 'unauthorized',
  403: 'action forbidden',
  404: 'not found',
  409: 'conflict with preexisting data',
  412: 'precondition failed',
  500: 'server error',
}

const logRequest = (req) => {
  const ellapsedTime = +new Date() - req.initialTime
  const info = req.logMessage + ` - Time: ${ellapsedTime} ms`
  logger.info(info)
}

/**
 * Send a standarized success response.
 * @param {Response} res - Response object
 * @param {number} status - Http status code
 * @param {object|Array} data - Data to send
 * @param {string} detail - Response message
 */
exports.seccess = (req, res, status, data, detail) => {
  const statusCode = status || httpSatus.ok
  const statusMessage = detail || mapCodeToMessage[statusCode]

  logRequest(req)

  return res.status(statusCode).json({
    error: false,
    detail: statusMessage,
    data: data || {},
  })
}

/**
 * Send a standarized error response.
 * @param {Response} res - Response object
 * @param {number} status - Http status code
 * @param {object|Array} data - Data to send
 * @param {string} detail - Response message
 */
exports.error = (req, res, status, data, detail) => {
  const statusCode = status || httpSatus.serverError
  const statusMessage = detail || mapCodeToMessage[statusCode]

  logRequest(req)

  return res.status(statusCode).json({
    error: true,
    detail: statusMessage,
    data: data || {},
  })
}
