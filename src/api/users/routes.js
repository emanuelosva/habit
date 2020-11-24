/**
 * @fileoverview Routing Layer.
 * Specify the proper routes.
 */

const { Router } = require('express')
const { auth, requestValidation } = require('../../middleware')
const { scopes } = require('../../auth')
const userController = require('./controllers')
const validators = require('./requestValidation')

const router = Router()

/**
 * Register a new user.
 * @route POST /users/signup
 * @group Users - Operations about users.
 * @param {UserSignup.model} user.body.required - The user data.
 * @returns {Success.model} 201 - User created.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Conflict.model} 409 - Username or email already exists.
 */
router.post('/signup',
  requestValidation(validators.signupValidator),
  userController.signup,
)

/**
 * Verify email account.
 * @route POST /users/verify-email
 * @group Users - Operations about users.
 * @param {EmailToken.model} token.body.required - The email token.
 * @returns {Success.model} 200 - User created.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Forbidden.model} 403 - Invalid token.
 */
router.post('/verify-email',
  requestValidation(validators.verifyEmailValidator),
  userController.verifyEmail,
)

/**
 * Login a user.
 * @route POST /users/login
 * @group Users - Operations about users.
 * @param {UserLogin.model} credentials.body.required - The user credentials.
 * @returns {LoginResponse.model} 200 - User logged.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Unauthorized.model} 401 - Invalid credentials.
 */
router.post('/login',
  requestValidation(validators.loginValidator),
  userController.login,
)

/**
 * Send a new JWT token.
 * @route POST /users/refresh-token
 * @group Users - Operations about users.
 * @param {RefreshToken.model} credentials.body.required - The refresh token.
 * @returns {LoginResponse.model} 200 - New token and user info.
 * @returns {BadRequest.model} 400 - Invalid request data.
 * @returns {Forbidden.model} 403 - Invalid token.
 */
router.post('/refresh-token',
  requestValidation(validators.refreshTokenValidator),
  userController.refreshToken,
)

/**
 * Return the current user info.
 * @route GET /users
 * @group Users - Operations about users.
 * @returns {UserResponse.model} 200 - Current user info.
 * @returns {Unauthorized.model} 401 - Invalid credentials.
 * @returns {Forbidden.model} 403 - Forbidden.
 * @returns {PreconditionFailed.model} 412 - Account not verified.
 * @security JWT
 */
router.get('/',
  auth.isAuthenticated,
  auth.checkScopes([scopes.admin, scopes.user]),
  userController.getCurrentUser,
)

/**
 * Return the current user info.
 * @route PATCH /users
 * @group Users - Operations about users.
 * @param {UserUpdate.model} user.body - The data to update
 * @returns {UserResponse.model} 200 - Current user info.
 * @returns {Unauthorized.model} 401 - Invalid credentials.
 * @returns {Forbidden.model} 403 - Forbidden.
 * @returns {Conflict.model} 409 - Username or email already exists.
 * @returns {PreconditionFailed.model} 412 - Account not verified.
 * @security JWT
 */
router.patch('/',
  auth.isAuthenticated,
  auth.checkScopes([scopes.admin, scopes.user]),
  requestValidation(validators.updateValidator),
  userController.updateOne,
)

/**
 * Return the current user info.
 * @route DELETE /users
 * @group Users - Operations about users.
 * @returns {Success.model} 200 - Current user info.
 * @returns {Unauthorized.model} 401 - Invalid credentials.
 * @returns {Forbidden.model} 403 - Forbidden.
 * @returns {PreconditionFailed.model} 412 - Account not verified.
 * @security JWT
 */
router.delete('/',
  auth.isAuthenticated,
  auth.checkScopes([scopes.admin, scopes.user]),
  userController.deleteOne,
)

module.exports = router
