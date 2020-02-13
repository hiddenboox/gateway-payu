import querystring from 'querystring'
import https from 'https'
import { URL } from 'url'

import { HttpVerb } from '../consts'
import { required } from './validation'

export const request = (
  { url, json, params, body, ...rest } = { method: HttpVerb.GET, json: true }
) => {
  required('url', url)

  const { pathname, search, host } = new URL(
    `${url}${params ? '?' + querystring.stringify(params) : ''}`
  )
  return new Promise((resolve, reject) => {
    const path = `${pathname}${search}`
    const req = https
      .request({ host, path, ...rest }, res => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', chunk => {
          data += chunk
        })
        console.log(res.statusCode)
        res.on('end', () => {
          resolve(json ? JSON.parse(data) : data)
        })
      })

    req.on('error', err => {
      console.log('err')
      reject(new Error(err.message))
    })

    if (body) {
      req.write(typeof body === 'object' ? JSON.stringify(body) : body)
    }

    req.end()
  })
}

export const get = (url, options = {}) => request({ ...options, url, method: HttpVerb.GET })
export const post = (url, options = {}) => request({ ...options, url, method: HttpVerb.POST })
