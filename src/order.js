import assert from 'assert'

import request from './helpers'
import { ContentType, HttpVerb } from './consts'

const { PAYU_CLIENT_NOTIFY_SITE_URL, PAYU_CLIENT_ID } = process.env

export default async ({ accessToken, description, isProduction }) => {
  assert.ok(accessToken, 'accessToken should not be empty')
  assert.ok(description, 'description should not be empty')

  try {
    return await request({
      uri: '/api/v2_1/orders',
      method: HttpVerb.POST,
      json: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': ContentType.JSON,
      },
      body: {
        notifyUrl: PAYU_CLIENT_NOTIFY_SITE_URL,
        merchantPosId: PAYU_CLIENT_ID,
        ...description,
      },
      isProduction,
    })
  } catch (response) {
    return response.error
  }
}
