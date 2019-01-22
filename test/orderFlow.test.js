import 'chai/register-should'

import { authorize, order } from '../src'

const BASE_API = 'https://secure.snd.payu.com'

describe('order flow', () => {
  it('should return order status', async () => {
    const body = {
      notifyUrl: 'https://your.eshop.com/notify',
      customerIp: '127.0.0.1',
      merchantPosId: '145227',
      description: 'RTV market',
      currencyCode: 'PLN',
      totalAmount: '15000',
      extOrderId: 'k7m4i37kem75fba2dkr18g',
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
      clientId: '349114',
      clientSecret: '0818f8affc213dee5ed10cc402821674',
      grantType: 'client_credentials'
    })
    const response = await order({ accessToken, body })

    response.should.have.property('access_token')
    response.should.have.property('token_type')
    response.should.have.property('expires_in')
    response.should.have.property('grant_type')
  })
})
