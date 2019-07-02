"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _helpers = require("./helpers.js");

var _consts = require("./consts.js");

var _url = require("./url.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  PAYU_CLIENT_NOTIFY_SITE_URL,
  PAYU_CLIENT_ID
} = process.env;

var _default = async ({
  accessToken,
  description
}) => {
  _assert.default.ok(accessToken, 'accessToken should not be empty');

  _assert.default.ok(description, 'description should not be empty');

  try {
    return await (0, _helpers.post)(`${_url.url}/api/v2_1/orders`, {
      notifyUrl: PAYU_CLIENT_NOTIFY_SITE_URL,
      merchantPosId: PAYU_CLIENT_ID,
      ...description
    }, {
      json: true,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': _consts.ContentType.JSON
      }
    });
  } catch (response) {
    return response.error;
  }
};

exports.default = _default;