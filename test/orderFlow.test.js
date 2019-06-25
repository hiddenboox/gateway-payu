import 'chai/register-should'
import nock from 'nock'

import { authorize, order } from '../src'
import { mockAuthorize, mockOrder } from './server'

const { PAYU_CLIENT_ID, PAYU_CLIENT_SECRET } = process.env

describe('order flow', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return order status', async () => {
    if(PAYU_CLIENT_ID && PAYU_CLIENT_SECRET) {
      mockAuthorize()
      mockOrder()
    }
    const body = {
      notifyUrl: 'https://your.eshop.com/notify',
      customerIp: '127.0.0.1',
      merchantPosId: PAYU_CLIENT_ID,
      description: 'RTV market',
      currencyCode: 'PLN',
      totalAmount: '15000',
      buyer: {
        email: 'john.doe@example.com',
        phone: '654111654',
        firstName: 'John',
        lastName: 'Doe'
      },
      products: [
        {
          name: 'Wireless Mouse for Laptop',
          unitPrice: '15000',
          quantity: '1'
        }
      ]
    }

    const { accessToken } = await authorize({
      clientSecret: PAYU_CLIENT_SECRET,
      clientId: PAYU_CLIENT_ID,
      grantType: 'client_credentials'
    })
    const response = await order({ accessToken, body })
    
    response.should.have.property('redirectUri')
    response.should.have.property('orderId')
    response.should.have.property('status')
  })
})
