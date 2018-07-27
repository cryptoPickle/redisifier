import SimpleRedis from '../../index'
import config from '../../config';

const client = SimpleRedis();
 client._client//?
describe('Connection', () => {
  test('Client tries to connect 127.0.0.1:6379 for default', () => {
    expect(client._client.address).toBe('127.0.0.1:6379')
  });
})