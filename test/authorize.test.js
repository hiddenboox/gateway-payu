import nock from 'nock'
import assert from 'assert'
import { expect } from 'chai'

import { mockAuthorize } from './server'

import { authorize } from '../src'

const { PAYU_CLIENT_ID, PAYU_CLIENT_SECRET } = process.env

describe('authorize function', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return oauth token', async () => {
    mockAuthorize()

    const response = await authorize({
      clientSecret: PAYU_CLIENT_SECRET,
      clientId: PAYU_CLIENT_ID,
      grantType: 'client_credentials',
    })

    response.should.have.property('accessToken')
    response.should.have.property('tokenType')
    response.should.have.property('expiresIn')
    response.should.have.property('grantType')
  })

  it('should return validation error on PAYU_CLIENT_ID when field is not provided', async () => {
    try {
      await authorize()
    } catch (err) {
      should.throw(() => { throw err }, assert.AssertionError, 'PAYU_CLIENT_ID should not be empty')
    }
  })

  it('should return validation error on PAYU_CLIENT_SECRET when field is not provided', async () => {
    try {
      await authorize({ clientId: 2 })
    } catch (err) {
      should.throw(() => { throw err }, assert.AssertionError, 'PAYU_CLIENT_SECRET should not be empty')
    }
  })

  it('should return validation error on grantType when field is not provided', async () => {
    try {
      await authorize({ clientId: 2, clientSecret: 2 })
    } catch (err) {
      should.throw(() => { throw err }, assert.AssertionError, 'grantType should not be empty')
    }
  })
})
