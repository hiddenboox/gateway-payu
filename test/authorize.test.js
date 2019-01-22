import 'chai/register-should'
import nock from 'nock'

import { authorize } from '../src'

const BASE_API = 'https://secure.snd.payu.com'

describe('authorize function', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return oauth token', async () => {
    nock(BASE_API)
      .post('/pl/standard/user/oauth/authorize')
      .query(() => true)
      .reply(200, {
        access_token: '8f79c971-195e-43f5-bd83-ad2104414acc',
        token_type: 'bearer',
        expires_in: 43199,
        grant_type: 'client_credentials'
      })

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
