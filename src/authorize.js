import { post } from './helpers/request'
import { environment } from './env'
import { required } from './helpers/validation'

export default async ({ clientId, clientSecret, grantType } = {}) => {
  required('PAYU_CLIENT_ID', clientId)
  required('PAYU_CLIENT_SECRET', clientSecret)
  required('grantType', grantType)
  
  try {
    const response = await post(
      `${environment}/pl/standard/user/oauth/authorize`,
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
