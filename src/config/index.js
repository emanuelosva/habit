/**
 * @fileoverview App settings.
 */

require('dotenv').config()

module.exports = {
  app: {
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost',
    defaultTimezone: 'America/Mexico_City',
    isDev: process.env.NODE_ENV !== 'production',
    inTest: process.env.NODE_ENV === 'test',
  },
  auth: {
    secret: process.env.SECRET,
    algorithms: ['HS256'],
  },
  db: {
    host: process.env.POSTGRES_SERVER || 'db',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
  },
}
