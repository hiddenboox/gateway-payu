import { post } from './helpers/request'
import { ContentType, HEADERS } from './consts'
import { environment } from './env'
import { required } from './helpers/validation'

const { PAYU_CLIENT_NOTIFY_SITE_URL, PAYU_CLIENT_ID } = process.env

export default async ({ accessToken, payment, cart, buyer, products } = {}) => {
  required('accessToken', accessToken)
  required('payment', payment)
  required('cart', cart)
  required('buyer', buyer)
  required('products', products)

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
          [HEADERS.Authorization]: `Bearer ${accessToken}`,
          [HEADERS.ContentType]: ContentType.JSON
        }
      }
    )
  } catch (response) {
    return response.error
  }
}
