import request from './helpers'
import { HttpVerb } from './consts';

export default async ({ isProduction, clientId, clientSecret, grantType }) => {
  try {
    const response = await request({
      uri: '/pl/standard/user/oauth/authorize',
      method: HttpVerb.POST,
      json: true,
      qs: {
        client_secret: clientSecret,
        grant_type: grantType,
        client_id: clientId
      },
      isProduction
    })

    return {
      accessToken: response.access_token,
      tokenType: response.token_type,
      expiresIn: response.expires_in,
      grantType: response.grant_type
    }
  } catch (ex) {
    console.error(ex.message)
  }
}
