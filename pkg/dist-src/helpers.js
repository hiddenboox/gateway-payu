"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = exports.get = exports.request = void 0;

var _querystring = _interopRequireDefault(require("querystring"));

var _https = _interopRequireDefault(require("https"));

var _url = require("url");

var _consts = require("./consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const request = ({
  url,
  json,
  params,
  body,
  ...rest
} = {
  method: 'GET',
  json: true
}) => {
  const uri = new _url.URL(`https://${url}${params ? '?' + _querystring.default.stringify(params) : ''}`);
  return new Promise((resolve, reject) => {
    const req = _https.default.request({
      host: uri.host,
      path: `${uri.pathname}${uri.search}`,
      ...rest
    }, resp => {
      let data = '';
      resp.setEncoding('utf8');
      resp.on('data', chunk => {
        data += chunk;
      });
      resp.on('end', () => {
        resolve(json ? JSON.parse(data) : data);
      });
    }).on("error", err => {
      console.log(err);
      reject("Error: " + err.message);
    });

    if (body) {
      req.write(json ? JSON.stringify(body) : body);
    }

    req.end();
  });
};

exports.request = request;

const get = (url, params, options = {}) => request({
  url,
  params,
  ...options,
  ...{
    method: _consts.HttpVerb.GET
  }
});

exports.get = get;

const post = (url, body, options = {}) => request({
  url,
  body,
  ...options,
  ...{
    method: _consts.HttpVerb.POST
  }
});

exports.post = post;