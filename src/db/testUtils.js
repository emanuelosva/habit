/**
 * @fileoverview Test DB utils.
 */

const logger = require('../utils/logger')
const db = require('./connection')

const IS_TEST = process.env.NODE_ENV === 'test'

exports.createDb = async () => {
  if (IS_TEST) {
    await db.schema.createSchemaIfNotExists('test')
    logger.info('DB test created.')
  }
}

exports.runMigrations = async () => {
  if (IS_TEST) {
    await db.migrate.latest()
    logger.info('DB connected and ready.')
  }
}

exports.dropDb = async () => {
  if (IS_TEST) {
    await db.schema.raw('DROP SCHEMA IF EXISTS "test" CASCADE')
    logger.info('DB drop completed.')
  }
}
