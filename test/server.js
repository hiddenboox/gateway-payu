import nock from 'nock'

import { Environment } from '../src/consts'

export const mockAuthorize = () => nock(Environment.SANDBOX)
    .post('/pl/standard/user/oauth/authorize')
    .query(() => true)
    .reply(200, {
        access_token: '8f79c971-195e-43f5-bd83-ad2104414acc',
        token_type: 'bearer',
        expires_in: 43199,
        grant_type: 'client_credentials'
    })

export const mockOrder = () => nock(Environment.SANDBOX)
    .post('/api/v2_1/orders')
    .query(() => true)
    .reply(200, {
        status: {
            statusCode: 'SUCCESS'
        },
        redirectUri: '{url_do_przekierowania_na_stronę_podsumowania_płatności}',
        orderId: 'WZHF5FFDRJ140731GUEST000P01',
        extOrderId: '{twój_identyfikator_zamówienia}'
    })