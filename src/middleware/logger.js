/**
 * @fileoverview Logger middleware
 */

/**
 * Express request/response middleware
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 */
module.exports = (req, res, next) => {
  const date = new Date()
  const { method, originalUrl, hostname, body } = req

  req.initialTime = +date
  req.logMessage = `${date.toDateString()} METHOD: ${method} - URL: ${originalUrl}` +
    ` - HOST: ${hostname} => BODY: ${JSON.stringify(body)}`

  next()
}
