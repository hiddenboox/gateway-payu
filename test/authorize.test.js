import 'chai/register-should'
import nock from 'nock'

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
})
