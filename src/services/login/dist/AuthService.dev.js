"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _jsrsasign = require("jsrsasign");

var _jwtKeys = require("./jwt.keys.json");

var _config = require("../config.json");

var _OAuth = _interopRequireDefault(require("../routes/OAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var refreshAccessToken = function refreshAccessToken() {
  var header, now, duration, expireTime, claimSet, sHeader, sPayload, sJWT, accessToken;
  return regeneratorRuntime.async(function refreshAccessToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Create header
          header = _objectSpread({}, _config.OAUTH_HEADER, {
            kid: _jwtKeys.private_key_id
          }); // Create payload

          now = Math.floor(new Date().getTime() / 1000); // Convert from ms to seconds

          duration = 60 * 60; // Max token duration allowed (1hr)

          expireTime = now + duration;
          claimSet = {
            iss: _jwtKeys.client_email,
            iat: now,
            exp: expireTime,
            scope: _config.ACCESS_TOKEN_SCOPE,
            aud: _config.OAUTH_API_URL
          }; // Sign JWT (JSON web token)

          sHeader = JSON.stringify(header);
          sPayload = JSON.stringify(claimSet);
          sJWT = _jsrsasign.KJUR.jws.JWS.sign(null, sHeader, sPayload, _jwtKeys.private_key); // Send request to get access token

          _context.next = 10;
          return regeneratorRuntime.awrap((0, _OAuth["default"])(sJWT, now));

        case 10:
          accessToken = _context.sent;

          if (!accessToken) {
            _context.next = 16;
            break;
          }

          // Sets access token in auth headers in every axios request moving forward TODO: LOWKEY NOT SAFE... - Emily
          _axios["default"].defaults.headers.common.Authorization = "".concat(accessToken.type, " ").concat(accessToken.token);
          return _context.abrupt("return", true);

        case 16:
          return _context.abrupt("return", false);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = refreshAccessToken;
exports["default"] = _default;