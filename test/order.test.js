import 'chai/register-should'
import nock from 'nock'

import { order } from '../src'

const BASE_API = 'https://secure.snd.payu.com'

describe('order function', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return order status', async () => {
    nock(BASE_API)
      .post('/api/v2_1/orders')
      .query(() => true)
      .reply(200, {
        status: {
          statusCode: 'SUCCESS'
        },
        redirectUri: '{url_do_przekierowania_na_stronę_podsumowania_płatności}',
        orderId: 'WZHF5FFDRJ140731GUEST000P01',
        extOrderId: '{twój_identyfikator_zamówienia}'
      })

    const response = await order({
      accessToken: '',
      order: {}
    })

    response.should.have.property('status')
    response.should.have.property('redirectUri')
    response.should.have.property('orderId')
  })
})
