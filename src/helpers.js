import request from 'request-promise-native'

export default ({ isProduction, url, ...opt }) =>
  request({
    ...opt,
    url: `${
      isProduction ? 'https://secure.payu.com' : 'https://secure.snd.payu.com'
    }${url}`
  })
