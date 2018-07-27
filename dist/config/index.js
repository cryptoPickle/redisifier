'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var config = {
  host: process.env.REDISURL,
  port: process.env.REDISPORT,
  password: process.env.REDISPASSWORD
};

exports.default = config;
//# sourceMappingURL=index.js.map