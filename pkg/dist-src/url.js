"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = void 0;

var _consts = require("./consts.js");

const url = _consts.Environment[(process.env.PAYU_ENVIRONMENT ? process.env.PAYU_ENVIRONMENT : 'sandbox').toUpperCase()];

exports.url = url;