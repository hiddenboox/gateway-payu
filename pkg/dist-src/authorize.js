"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers.js");

var _url = require("./url.js");

var _default = async ({
  clientId,
  clientSecret,
  grantType
}) => {
  try {
    const response = await (0, _helpers.post)(`${_url.url}/pl/standard/user/oauth/authorize`, null, {
      json: true,
      params: {
        client_secret: clientSecret,
        grant_type: grantType,
        client_id: clientId
      }
    });
    return {
      accessToken: response.access_token,
      tokenType: response.token_type,
      expiresIn: response.expires_in,
      grantType: response.grant_type
    };
  } catch (ex) {
    console.error(ex.message);
  }
};

exports.default = _default;