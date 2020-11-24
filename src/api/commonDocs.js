/**
 * @fileoverview JS Docs for Swagger documentation
 */

/**
 * @typedef Success
 * @property {boolean} error.required - Error status - eg: false
 * @property {string} detail.required - Operation message - eg: Operation successful
 * @property {string} data.required - Response data - eg: {}
 */

/**
 * @typedef BadRequest
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Error - eg: Invalid request info
 * @property {string} data.required - Response data - eg: {}
 */

/**
 * @typedef Unauthorized
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Error - eg: Invalid credentials
 * @property {string} data.required - Response data - eg: {}
 */

/**
 * @typedef Forbidden
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Error - eg: Forbidden
 * @property {string} data.required - Response data - eg: {}
 */

/**
 * @typedef NotFound
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Detail - eg: Not Found
 * @property {string} data.required - Response data - eg: {}
 */

/**
 * @typedef Conflict
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Detail - eg: Conflict with preexisting data
 * @property {string} data.required - Response data - eg: {}
 */

/**
 * @typedef PreconditionFailed
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Detail - eg: Precondition failed
 * @property {string} data.required - Response data - eg: {}
 */

/**
 * @typedef ServerError
 * @property {boolean} error.required - Error on requets - eg: true
 * @property {string} detail.required - Detail - eg: Server error
 * @property {string} data.required - Response data - eg: {}
 */
