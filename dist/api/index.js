"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var redis = require("redis");

var defaultoptions = {
  retry_strategy: function retry_strategy(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      //end reconnecting on specific error and flush all commands with individual
      //error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      //end reconnection after a specific timeout and flush all commands with
      //individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      //end reconnecting with built in error
      return undefined;
    }
    //reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
};

var SimpleRedis = function () {
  function SimpleRedis(_ref, cb) {
    var port = _ref.port,
        host = _ref.host,
        password = _ref.password,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? defaultoptions : _ref$options;

    _classCallCheck(this, SimpleRedis);

    this._port = port;
    this._host = host;
    this._options = options;
    this._password = password;
    this._callback = null || cb;
    this._client = this._createClient();
  }

  _createClass(SimpleRedis, [{
    key: "_createClient",
    value: function _createClient() {
      var _this = this;

      var client = redis.createClient(this._port, this._host, this._options);
      if (this._password) {
        client.auth(this._password);
      }
      client.on("connect", function () {
        if (_this._callback) {
          return _this._callback('Redis/Connected');
        }
      });
      return client;
    }
  }, {
    key: "setKeyValue",
    value: function setKeyValue(key, value, cb) {
      return this._client.set([key, value], function (err, reply) {
        if (cb) {
          if (err) return cb(new Error(err));
          return cb(null, reply);
        }
      });
    }
  }, {
    key: "getKeyValue",
    value: function getKeyValue(key, cb) {
      return this._client.get(key, function (err, reply) {
        if (cb) {
          if (err) return new Error(err);
          return cb(null, reply);
        }
      });
    }
  }, {
    key: "setHash",
    value: function setHash(key, json, cb) {
      return this._client.hmset(key, json, function (err, reply) {
        if (cb) {
          if (err) return cb(new Error(err));
          return cb(null, reply);
        }
      });
    }
  }, {
    key: "getHash",
    value: function getHash(key, cb) {
      return this._client.hgetall(key, function (err, reply) {
        if (cb) {
          if (err) return cb(new Error(err));
          return cb(null, reply);
        }
      });
    }
  }, {
    key: "setList",
    value: function setList(key, array, cb) {
      return this._client.rpush(key, array, function (err, reply) {
        if (cb) {
          if (err) return cb(new Error(err));
          return cb(null, reply);
        }
      });
    }
  }, {
    key: "getList",
    value: function getList(key, cb) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      return this._client.lrange(key, 0, index, function (err, reply) {
        if (cb) {
          if (err) return cb(new Error(err));
          return cb(null, reply);
        }
      });
    }
  }, {
    key: "createSet",
    value: function createSet(key, array, cb) {
      return this._client.sadd(key, array, function (err, reply) {
        if (cb) {
          if (err) return cb(new Error(err));
          return cb(null, reply);
        }
      });
    }
  }, {
    key: "getSet",
    value: function getSet(key, cb) {
      this._client.smembers(key, function (err, reply) {
        if (cb) {
          if (err) return cb(new Error(err));
          return cb(null, reply);
        }
      });
    }
  }, {
    key: "isExists",
    value: function isExists(key, cb) {
      this._client.exists(key, function (err, reply) {
        if (err) throw new Error(err);else {
          if (reply === 1) return cb(true);
          return cb(false);
        }
      });
    }
  }, {
    key: "deleteKey",
    value: function deleteKey(key, cb) {
      return this._client.del(key, function (err, reply) {
        if (cb) {
          if (err) throw new Error(err);
          return cb(reply);
        }
      });
    }
  }, {
    key: "setExpireTime",
    value: function setExpireTime(key, second, cb) {
      this._client.expire(key, second, function (err, reply) {
        if (err) throw new Error(err);
        return cb(reply);
      });
    }
  }]);

  return SimpleRedis;
}();

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    port: null,
    host: null,
    password: null,
    options: defaultoptions
  };
  var cb = arguments[1];
  return new SimpleRedis(options, cb);
};
//# sourceMappingURL=index.js.map