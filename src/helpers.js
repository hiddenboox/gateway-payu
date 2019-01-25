import request from 'request-promise-native'

export default ({ isProduction, ...opt }) =>
  request({
    baseUrl: `${
      isProduction ? 'https://secure.payu.com' : 'https://secure.snd.payu.com'
    }`,
    ...opt,
  })
