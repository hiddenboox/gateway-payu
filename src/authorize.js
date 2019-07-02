import { post } from './helpers'
import { url } from './url'

export default async ({ clientId, clientSecret, grantType }) => {
  try {
    const response = await post(
      `${url}/pl/standard/user/oauth/authorize`,
      null,
      {
        json: true,
        params: {
          client_secret: clientSecret,
          grant_type: grantType,
          client_id: clientId
        }
      }
    )

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
