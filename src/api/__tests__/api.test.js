import SimpleRedis from "../../index";
import config from "../../config";
let options = {
  port: config.port,
  host: config.host,
  password: config.password
};
const client = SimpleRedis();
const client2 = SimpleRedis(options);

beforeEach(() => {
  client2.deleteKey('myKey3');
  client2.deleteKey('myKey21');
  client2.deleteKey('myKey3222');
  client2.deleteKey('myKeytest');
  client2.deleteKey('myKey123123')
  client2.deleteKey('myKey33212')

})

describe("Connection", () => {
  test("Client tries to connect 127.0.0.1:6379 for default", () => {
    expect(client._client.address).toBe("127.0.0.1:6379");
  });
  test("Client connects the redis", () => {
    const client3 = SimpleRedis(options, reply => {
      expect(reply).toBe("Redis/Connected");
    });
  });
});



describe("Data Flow", () => {
  test("Set Key/Value", () => {
    client2.setKeyValue("myKey1", "test", (err, reply) => {
      return expect(reply).toBe("OK");
    });
  });
  test("Get Key/Value", () => {
    client2.getKeyValue("myKey1", (err, reply) => {
      return expect(reply).toBe("test");
    });
  });
  test("Set Hash", () => {
    client2.setHash(
      "myKey3",
      { value1: "value2", value2: "value2" },
      (err, reply) => {
        return expect(reply).toBe("OK");
      }
    );
  });
  test("Get Hash", () => {
    client.setHash('test12312354',{ value1: "value2", value2: "value2" }, () => {
      client2.getHash("test12312354", (err, reply) => {
        console.log(reply)
        return expect(reply).toEqual({ value1: "value2", value2: "value2" });
      });
    })
  });
  test("Set List", () => {
    client2.deleteKey('myKey21')
    client2.setList("myKey21", ["test", "test2", "test3"], (err, reply) => {
      expect(reply).toBe(3);
    });
  });
  test("Get Lists", () => {
    client2.deleteKey('myKey3222', (err,resp) => {
      client2.setList("myKey3222", ["simple", "redis"], () => {
        client.getList('myKey3222', (err,reply) => {
          return expect(reply).toEqual(["simple", "redis"]);
        })
      })
    })
  });
  test("Create Set", () => {
    client2.createSet(
      "myKeytest",
      ["test1", "test2", "test3"],
       (err, reply) => {
        return expect(reply).toBe(3);
      }
    );
  });
  test("Get Sets", () => {
    client2.createSet(
      "myKey123123",
      ["test1", "test2", "test3"],
      () => {
        client2.getSet('myKey123123', (err,reply) => {
          return expect(reply).toEqual(["test3", "test2", "test1"])
        })
      }
    );
  });
});
