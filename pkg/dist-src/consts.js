"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Environment = exports.HttpVerb = exports.ContentType = void 0;
const ContentType = {
  JSON: 'application/json'
};
exports.ContentType = ContentType;
const HttpVerb = {
  POST: 'POST',
  GET: 'GET'
};
exports.HttpVerb = HttpVerb;
const Environment = {
  SANDBOX: 'secure.snd.payu.com',
  PRODUCTION: 'secure.payu.com'
};
exports.Environment = Environment;