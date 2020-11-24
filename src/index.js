/**
 * Server entrypoint
 */

const app = require('./app')
const config = require('./config')
const { logger } = require('./utils')

const PORT = config.app.port
const HOST = config.app.host

app.listen(PORT, (err) => {
  if (err) throw new Error('Server Error')
  if (config.app.isDev) {
    logger.info(`Server running 🚀 on http://localhost:${PORT}`)
  } else {
    logger.info(`Server running 🚀 on ${HOST}`)
  }
})
