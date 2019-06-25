import 'chai/register-should'
import nock from 'nock'

import { mockAuthorize } from './server'

import { authorize } from '../src'

describe('authorize function', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return oauth token', async () => {
    mockAuthorize()

    const response = await authorize({
      clientId: '349114',
      clientSecret: '0818f8affc213dee5ed10cc402821674',
      grantType: 'client_credentials',
      isSandbox: true
    })

    response.should.have.property('accessToken')
    response.should.have.property('tokenType')
    response.should.have.property('expiresIn')
    response.should.have.property('grantType')
  })
})
