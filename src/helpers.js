import request from 'request-promise-native'

import { Environment } from './consts'

export default ({ isProduction, ...opt }) =>
  request({
    baseUrl: `${
      isProduction ? Environment.PRODUCTION : Environment.TEST
    }`,
    ...opt,
  })
