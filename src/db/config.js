/**
 * @fileoverview Knex config
 */

const path = require('path')
const config = require('../config')
const { convertToCamel, convertToSnakeCase } = require('./utils')

const baseConfig = {
  client: 'postgres',
  version: '13',
  migrations: {
    directory: path.join(__dirname, './migrations'),
  },
  pool: {
    afterCreate: (connection, done) => {
      connection.query(`SET timezone=${config.app.defaultTimezone};`, (err) => {
        if (err) done(err, connection)
      })
    },
  },
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) return result.map((row) => convertToCamel(row))
    return convertToCamel(result)
  },
  wrapIdentifier: (value, orignImpl, queryContext) => orignImpl(convertToSnakeCase(value)),
}

module.exports = {
  production: () => {
    const config = baseConfig
    config.connection = {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.name,
      port: config.db.port,
    }
    return config
  },
  development: () => {
    const config = baseConfig
    config.connection = {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.name,
      port: config.db.port,
    }
    return config
  },
  test: () => {
    const config = baseConfig
    config.connection = {
      host: 'db',
      user: 'postgres',
      password: 'postgres',
      database: 'test',
      port: 5432,
    }
    return config
  },
}
