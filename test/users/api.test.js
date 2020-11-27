/**
 * @fileoverview Users e2e Testing.
 */

const supertest = require('supertest')
const app = require('../../src/app')
const { testDb } = require('../../src/db')
const { user } = require('./data')

const request = supertest(app)

describe('Users endpoints', () => {
  beforeAll(async () => {
    await testDb.createDb()
    await testDb.runMigrations()
  })

  afterAll(async () => {
    await testDb.dropDb()
  })

  const baseUrl = '/api/users'

  describe('POST /users/signup', () => {
    test('Should return a a success response', async () => {
      const { status, body: { data } } = await request
        .post(`${baseUrl}/signup`)
        .send(user)
      expect(status).toEqual(201)
      expect(data).toBeDefined()
    })
  })
})
