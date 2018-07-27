const redis = require("redis");

const options = {
  retry_strategy: function(options) {
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

class SimpleRedis {
  constructor(port = null, host = null, password = null, options = options) {
    this._port = port;
    this._host = host;
    this._options = options;
    this._password = password;
    this._client = this._createClient();
  }
  _createClient() {
    const client = redis.createClient(this._port, this._host, this._options);
    if (this._password) {
      client.auth(this._password, () => console.log("Redis => Authenticated"));
    }
    client.on("connect", () => console.log("Redis => Connected"));
    return client;
  }
  setKeyValue(key, value, cb) {
    return this._client.set([key, value], (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
  getKeyValue(key, cb) {
    return this._client.get(key, (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
  setHash(key, json, cb) {
    return this._client.hmset(key, json, (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
  getHash(key, cb) {
    return this._client.hgetall(key, (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
  setList(key, array, cb) {
    return this._client.rpush(key, array, (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
  getList(key, cb, index = -1) {
    return this._client.lrange(key, 0, index, (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
  createSet(key, array, cb) {
    return this._client.sadd(key, array, (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
  getSet(key, cb) {
    this._client.smembers(key, (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
  isExists(key, cb) {
    this._client.exists(key, (err, reply) => {
      if (err) throw new Error(err);
      else {
        if (reply === 1) return cb(true);
        return cb(false);
      }
    });
  }
  deleteKey(key, cb) {
    return this._client.del(key, (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
  setExpireTime(key, second, cb) {
    this._client.expire(key, second, (err, reply) => {
      if (err) throw new Error(err);
      return cb(reply);
    });
  }
}

export default (port = null, host = null, password = null, options = options) => new SimpleRedis(port,host, password,options);
