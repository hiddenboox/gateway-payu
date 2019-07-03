import querystring from 'querystring'
import https from 'https'
import { URL } from 'url'
import { HttpVerb } from './consts'

export const request = ({ url, json, params, body, ...rest } = { method: 'GET', json: true }) => {
  const uri = new URL(`${url}${params ? '?' + querystring.stringify(params) : ''}`)
  return new Promise((resolve, reject) => {
    const req = https.request({ host: uri.host, path: `${uri.pathname}${uri.search}`, ...rest }, (resp) => {
      let data = '';
      resp.setEncoding('utf8');
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      resp.on('end', () => {
        resolve(json ? JSON.parse(data) : data);
      });
    
    }).on("error", (err) => {
      console.log(err)
      reject("Error: " + err.message);
    })

    if (body) {
      req.write(json ? JSON.stringify(body) : body)
    }

    req.end()
  })
}

export const get = (url, params, options = {}) => request({ url, params, ...options, ...{ method: HttpVerb.GET } })
export const post = (url, body, options = {}) => request({ url, body, ...options, ...{ method: HttpVerb.POST } })
