import assert from 'assert'

import { post } from './helpers'
import { ContentType } from './consts'
import { url } from './url'

const { PAYU_CLIENT_NOTIFY_SITE_URL, PAYU_CLIENT_ID } = process.env

export default async ({ accessToken, description }) => {
  assert.ok(accessToken, 'accessToken should not be empty')
  assert.ok(description, 'description should not be empty')

  try {
    return await post(
      `${url}/api/v2_1/orders`,
      {
        notifyUrl: PAYU_CLIENT_NOTIFY_SITE_URL,
        merchantPosId: PAYU_CLIENT_ID,
        ...description,
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
