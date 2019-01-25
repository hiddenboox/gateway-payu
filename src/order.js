import request from './helpers'

export default async ({ isProduction, accessToken, body }) => {
  try {
    return await request({
      uri: '/api/v2_1/orders',
      method: 'POST',
      json: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body,
      isProduction,
    })
  } catch (response) {
    return response.error
  }
}
