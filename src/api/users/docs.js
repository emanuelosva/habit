/**
 * @fileoverview Swagger Docs.
 * JsDocs to create a OpenApi custon documentation.
 */

/**
 * @typedef UserSignup
 * @property {string} email.required - User email - eg: stan@marvel.com
 * @property {string} username.required - Username - eg: stan
 * @property {string} fullName.required - User full name - eg: Stan Lee
 * @property {string} password.required - User password - eg: Marvel123
 */

/**
 * @typedef UserLogin
 * @property {string} email.required - User email - eg: stan@marvel.com
 * @property {string} password.required - User password - eg: Marvel123
 */

/**
 * @typedef User
 * @property {string} email.required - User email - eg: stan@marvel.com
 * @property {string} username.required - Username - eg: stan
 * @property {string} fullName.required - User full name - eg: Stan Lee
 * @property {string} picture.required - User pictire - eg: https://somebucket/stan.png
 * @property {string} biography.required - User biography
 * @property {string} joinedAt.required - User register date - eg: 2020-12-11
 */

/**
 * @typedef UserUpdate
 * @property {string} email - User email - eg: stan@marvel.com
 * @property {string} username - Username - eg: stan
 * @property {string} fullName - User full name - eg: Stan Lee
 * @property {string} picture - User pictire - eg: https://somebucket/stan.png
 * @property {string} biography - User biography
 */

/**
 * @typedef UserAndToken
 * @property {User.model} user.required - User info
 * @property {string} accessToken.required - JWT token
 * @property {string} refreshToken.required - Refresh token
 */

/**
 * @typedef EmailToken
 * @property {string} emailToken.required - Email JWT
 */

/**
 * @typedef RefreshToken
 * @property {string} username.required - Username - eg: stan
 * @property {string} refreshToken.required - Refresh token
 */

/**
 * @typedef LoginResponse
 * @property {boolean} error.required - Error status - eg: false
 * @property {string} detail.required - Operation message - eg: User logged
 * @property {UserAndToken.model} data.required - Response data
 */

/**
 * @typedef UserResponse
 * @property {boolean} error.required - Error status - eg: false
 * @property {string} detail.required - Operation message - eg: User info
 * @property {User.model} data.required - Response data
 */
