import assert from 'assert'

import { post } from './helpers'
import { ContentType } from './consts'
import { environment } from './env'

const { PAYU_CLIENT_NOTIFY_SITE_URL, PAYU_CLIENT_ID } = process.env

export default async ({ accessToken, payment, cart, buyer, products }) => {
  assert.ok(accessToken, 'accessToken should not be empty')
  assert.ok(payment, 'payment should not be empty')
  assert.ok(cart, 'cart should not be empty')
  assert.ok(buyer, 'buyer should not be empty')
  assert.ok(products, 'products should not be empty')

  try {
    return await post(
      `${environment}/api/v2_1/orders`,
      {
        notifyUrl: PAYU_CLIENT_NOTIFY_SITE_URL,
        merchantPosId: PAYU_CLIENT_ID,
        ...payment, 
        ...cart, 
        ...buyer, 
        ...products
      },
      {
        json: true,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': ContentType.JSON,
        },
      }
    )

  } catch (response) {
    return response.error
  }
}
