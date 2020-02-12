import querystring from 'querystring'
import https from 'https'
import { URL } from 'url'

import { HttpVerb } from '../consts'

export const request = (
  { url, json, params, body, ...rest } = { method: HttpVerb.GET, json: true }
) => {
  const { pathname, search, host } = new URL(
    `${url}${params ? '?' + querystring.stringify(params) : ''}`
  )
  return new Promise((resolve, reject) => {
    const path = `${pathname}${search}`
    const req = https
      .request({ host, path, ...rest }, resp => {
        let data = ''
        resp.setEncoding('utf8')
        resp.on('data', chunk => {
          data += chunk
        })

        resp.on('end', () => resolve(json ? JSON.parse(data) : data))
      })
      .on('error', err => reject('Error: ' + err.message))

    if (body) {
      req.write(json ? JSON.stringify(body) : body)
    }

    req.end()
  })
}

export const get = (url, params, options = {}) =>
  request({ ...options, url, params, method: HttpVerb.GET })
export const post = (url, body, options = {}) =>
  request({ ...options, url, body, method: HttpVerb.POST })
