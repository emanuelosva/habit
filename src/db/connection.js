/**
 * @fileoverview DB connection manage.
 */

const knex = require('knex')
const knexConfig = require('./config')

/**
 * Knex DB connection instance.
 */
module.exports = knex(knexConfig[process.env.NODE_ENV]())
