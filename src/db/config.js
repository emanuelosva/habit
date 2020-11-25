/**
 * @fileoverview Knex config
 */

const path = require('path')
const config = require('../config')
const { convertToCamel, convertToSnakeCase } = require('./utils')

module.exports = {
  production: {
    client: 'postgres',
    version: '13',
    connection: {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.name,
      port: config.db.port,
    },
    migrations: {
      directory: path.join(__dirname, './migrations'),
    },
    postProcessResponse: (result, queryContext) => {
      if (Array.isArray(result)) return result.map((row) => convertToCamel(row))
      else return convertToCamel(result)
    },
    wrapIdentifier: (value, orignImpl, queryContext) => orignImpl(convertToSnakeCase(value)),
  },
  development: {
    client: 'postgres',
    version: '13',
    connection: {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.name,
      port: config.db.port,
    },
    migrations: {
      directory: path.join(__dirname, './migrations'),
    },
    postProcessResponse: (result, queryContext) => {
      if (Array.isArray(result)) return result.map((row) => convertToCamel(row))
      return convertToCamel(result)
    },
    wrapIdentifier: (value, orignImpl, queryContext) => orignImpl(convertToSnakeCase(value)),
  },
  test: {
    client: 'postgres',
    version: '13',
    connection: {
      host: 'db',
      user: 'postgres',
      password: 'postgres',
      database: 'test',
      port: 5432,
    },
    migrations: {
      directory: path.join(__dirname, './migrations'),
    },
    postProcessResponse: (result, queryContext) => {
      if (Array.isArray(result)) return result.map((row) => convertToCamel(row))
      return convertToCamel(result)
    },
    wrapIdentifier: (value, orignImpl, queryContext) => orignImpl(convertToSnakeCase(value)),
  },
}
