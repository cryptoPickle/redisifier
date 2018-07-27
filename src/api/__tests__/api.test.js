import SimpleRedis from "../../index";
import config from "../../config";
let options = {
  port: config.port,
  host: config.host,
  password: config.password
};
const client = SimpleRedis();
const client2 = SimpleRedis(options);
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

afterEach(() => {
  client2.deleteKey('myKey')
});


describe("Data Flow", () => {
  test("Set Key/Value", () => {
    client2.setKeyValue("myKey1", "test", (err, reply) => {
      expect(reply).toBe("OK");
    });
  });
  test("Get Key/Value", () => {
    client2.getKeyValue("myKey1", (err, reply) => {
      expect(reply).toBe("test");
    });
  });
  test("Set Hash", () => {
    client2.setHash(
      "myKey3",
      { value1: "value2", value2: "value2" },
      (err, reply) => {
        expect(reply).toBe("OK");
      }
    );
  });
  test("Get Hash", () => {
    client2.getHash("myKey3", (err, reply) => {
      expect(reply).toEqual({ value1: "value2", value2: "value2" });
    });
  });
  test("Set List", () => {
    client2.setList("myKey", ["test", "test2", "test3"], (err, reply) => {
      expect(reply).toBe(3);
    });
  });
  test("Get Lists", () => {
    client2.setList("myKey", ["test", "test2", "test3"])
    client.getList('myKey', (err,reply) => {
      expect(reply).toEqual(["test", "test2", "test3"]);
    })
  });
  test("Create Set", () => {
    client2.createSet(
      "myKey",
      ["test1", "test2", "test3"],
       (err, reply) => {
        expect(reply).toBe(3);
      }
    );
  });
  test("Get Sets", () => {
    client2.createSet(
      "myKey",
      ["test1", "test2", "test3"],
      () => {
        client2.getSet('myKey', (err,reply) => {
          expect(reply).toEqual(["test1", "test2", "test3"])
        })
      }
    );
  });

});
