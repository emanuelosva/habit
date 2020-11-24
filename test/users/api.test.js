/**
 * @fileoverview Users e2e Testing.
 */

const supertest = require('supertest')
const app = require('../../src/app')
const { db } = require('../../src/db')
const logger = require('../../src/utils/logger')

const request = supertest(app)

describe('Users endpoints', () => {
  beforeAll(async () => {
    await db.migrate.latest()
    logger.info('DB connected and ready.')
  })
  afterAll(async () => {
    await db.raw('DROP DATABASE test')
    logger.info('DB drop completed.')
  })

  const baseUrl = '/api/users'

  describe('POST /users/signup', () => {
    test('Should return a a success response', async () => {
      const { status, body: { data } } = await request
        .post(`${baseUrl}/login`)
      expect(status).toEqual(201)
    })
  })
})
