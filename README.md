# Sample Usage

## Connection

```
import SimpleRedis from './SimpleRedis'
const client = SimpleRedis(port, host, password, {...options})
```
Without port and host entry client will try to connect localhost.


## Methods

### setKeyValue(key, value, [callback])
    Sets simple key value pair. Returns OK

### getKeyValue(key, value, [callback])
    Gets key-value pair. Returns Key-Value

### setHash(key, json, [callback])
    Sets hash (object). Returns OK.

### getHash(key, [callback])
    Gets hash.

###  setList(key, array, [callback])
    Sets an list item and pushes the existing. Returns length of list.

### getList(key, [callback], index)
    Gets list items, index is set to -1 for default which means everything will return. Index can be set to any.

### createSet(key, array, [callback])
    Creates set, returns length.

### getSet(key, [callback])
    Gets the elements of provided key.

### isExists(key, [callback])
    Checks if the key exists. Returns true or false;

### deleteKey(key, [callback])
    Deletes the provided key. Returns the length of deleted item.

### setExpireTime(key, second, [callback])
    Sets to a key expire time. Returns number of keys which expired time setted.