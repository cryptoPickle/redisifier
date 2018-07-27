"use strict";

var _index = require("../../index");

var _index2 = _interopRequireDefault(_index);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  port: _config2.default.port,
  host: _config2.default.host,
  password: _config2.default.password
};
var client = (0, _index2.default)();
var client2 = (0, _index2.default)(options);

beforeEach(function () {
  client2.deleteKey('myKey3');
  client2.deleteKey('myKey21');
  client2.deleteKey('myKey3222');
  client2.deleteKey('myKeytest');
  client2.deleteKey('myKey123123');
  client2.deleteKey('myKey33212');
});

describe("Connection", function () {
  test("Client tries to connect 127.0.0.1:6379 for default", function () {
    expect(client._client.address).toBe("127.0.0.1:6379");
  });
  test("Client connects the redis", function () {
    var client3 = (0, _index2.default)(options, function (reply) {
      expect(reply).toBe("Redis/Connected");
    });
  });
});

describe("Data Flow", function () {
  test("Set Key/Value", function () {
    client2.setKeyValue("myKey1", "test", function (err, reply) {
      return expect(reply).toBe("OK");
    });
  });
  test("Get Key/Value", function () {
    client2.getKeyValue("myKey1", function (err, reply) {
      return expect(reply).toBe("test");
    });
  });
  test("Set Hash", function () {
    client2.setHash("myKey3", { value1: "value2", value2: "value2" }, function (err, reply) {
      return expect(reply).toBe("OK");
    });
  });
  test("Get Hash", function () {
    client.setHash('test12312354', { value1: "value2", value2: "value2" }, function () {
      client2.getHash("test12312354", function (err, reply) {
        console.log(reply);
        return expect(reply).toEqual({ value1: "value2", value2: "value2" });
      });
    });
  });
  test("Set List", function () {
    client2.deleteKey('myKey21');
    client2.setList("myKey21", ["test", "test2", "test3"], function (err, reply) {
      expect(reply).toBe(3);
    });
  });
  test("Get Lists", function () {
    client2.deleteKey('myKey3222', function (err, resp) {
      client2.setList("myKey3222", ["simple", "redis"], function () {
        client.getList('myKey3222', function (err, reply) {
          return expect(reply).toEqual(["simple", "redis"]);
        });
      });
    });
  });
  test("Create Set", function () {
    client2.createSet("myKeytest", ["test1", "test2", "test3"], function (err, reply) {
      return expect(reply).toBe(3);
    });
  });
  test("Get Sets", function () {
    client2.createSet("myKey123123", ["test1", "test2", "test3"], function () {
      client2.getSet('myKey123123', function (err, reply) {
        return expect(reply).toEqual(["test3", "test2", "test1"]);
      });
    });
  });
});
//# sourceMappingURL=api.test.js.map