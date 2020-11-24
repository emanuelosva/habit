/**
 * @fileoverview Logger.
 */

const winston = require('winston')

/**
 * Logger instance
 */
module.exports = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
})
