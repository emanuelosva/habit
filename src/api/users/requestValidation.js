/**
 * @fileoverview Request Validation Layer.
 * Validate the request data and sanitize it.
 */

const { body } = require('express-validator')

exports.signupValidator = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().normalizeEmail().withMessage('Enter a valid email')
    .isLength({ max: 100 }).withMessage('Length must be little than 100'),
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 2, max: 20 }).withMessage('Username must contain from 2 to max 20 chars')
    .trim().escape(),
  body('fullName')
    .notEmpty().withMessage('fullName is required')
    .isLength({ min: 2, max: 100 }).withMessage('Length must be little than 100'),
  body('password')
    .notEmpty().withMessage('password is required')
    .isLength({ min: 6, max: 80 }).withMessage('Password must have length from 6 to max 80 chars')
    .trim(),
]

exports.verifyEmailValidator = [
  body('emailToken')
    .notEmpty().withMessage('emailToken is required')
    .isLength({ max: 1000 }).withMessage('Length must be little than 1000'),
]

exports.loginValidator = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().normalizeEmail().withMessage('Enter a valid email')
    .isLength({ max: 100 }).withMessage('Length must be little than 100'),
  body('password')
    .notEmpty().withMessage('password is required')
    .isLength({ min: 6, max: 80 }).withMessage('Password must have length from 6 to max 80 chars')
    .trim(),
]

exports.refreshTokenValidator = [
  body('username')
    .notEmpty().withMessage('username is required')
    .isLength({ max: 20 }).withMessage('Length must be little than 20')
    .trim().escape(),
  body('refreshToken')
    .notEmpty().withMessage('refreshToken is required')
    .isLength({ max: 256 }).withMessage('Length must be little than 256'),
]

exports.updateValidator = [
  body('email')
    .optional()
    .isEmail().normalizeEmail().withMessage('Enter a valid email')
    .isLength({ max: 100 }).withMessage('Length must be little than 100'),
  body('username')
    .optional()
    .isLength({ max: 20 }).withMessage('Length must be little than 20')
    .trim().escape(),
  body('fullName')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('Username must contain from 2 to max 20 chars')
    .trim().escape(),
  body('picture').optional()
    .isLength({ max: 10000 }).withMessage('Length must be little than 10000')
    .trim(),
  body('biography').optional()
    .isLength({ max: 4000 }).withMessage('Length must be little than 4000'),
]
