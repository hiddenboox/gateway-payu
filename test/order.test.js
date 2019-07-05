import 'chai/register-should'
import nock from 'nock'

import { mockOrder } from './server'

import { order } from '../src'

describe('order function', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return order status', async () => {
    mockOrder()
    
    const response = await order({
      accessToken: '123131=',
      payment: {},
      cart: {},
      buyer: {},
      products: [],
    })

    response.should.have.property('redirectUri')
    response.should.have.property('status')
    response.should.have.property('orderId')
  })
})
