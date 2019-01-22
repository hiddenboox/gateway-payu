import request from './helpers'

export default async ({ isProduction, accessToken, order }) => {
  try {
    return await request({
      url: '/api/v2_1/orders',
      method: 'POST',
      json: true,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: order,
      isProduction
    })
  } catch (ex) {
    console.error(ex.message)
  }
}
