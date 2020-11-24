/**
 * @fileoverview Request validation middleware
 */

const response = require('../response')
const { validationResult } = require('express-validator')
const { httpSatus } = require('../utils')

/**
 * Check the correct request body schema
 * @param {Array} validations - The express validators
 */
module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    response.error(req, res, httpSatus.badRequest, errors.array(), 'Bad request')
  }
}
