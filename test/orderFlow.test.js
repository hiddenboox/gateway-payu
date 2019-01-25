import 'chai/register-should'

import { authorize, order } from '../src'
import nock, { mockAuthorize, mockOrder } from './server'
import { clientId, clientSecret } from './config';

describe('order flow', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return order status', async () => {
    if(clientId && clientSecret) {
      mockAuthorize()
      mockOrder()
    }
    const body = {
      notifyUrl: 'https://your.eshop.com/notify',
      customerIp: '127.0.0.1',
      merchantPosId: clientId,
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
      clientSecret,
      clientId,
      grantType: 'client_credentials'
    })
    const response = await order({ accessToken, body })
    
    response.should.have.property('redirectUri')
    response.should.have.property('orderId')
    response.should.have.property('status')
  })
})
