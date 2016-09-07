# electron-save
A way to save and then load them.

## Usage
```js
var load = require('electron-save');
load('world', function(err, config) {
  if (err) {
    return console.error(err);
  }
  console.log('Loaded ' + config.path);
  var hello = config.get('hello');
  config.set('hello', hello || 'hello');
  config.save(function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('File saved to ' + config.path);
  });
});
```

## API

### load(name, cb)
Calling `load` is what actually gets a config.
##### Args
name (String): name of file to load
cb: (function(err, config)): Called with config object

### load.sync(name)
Synchronous alternative to `load`. Returns config or throws error. config object is the same except for the `save` method, which is also sync.

### config.get(key)
Get `key` from the loaded `config`.

### config.getAll()
Get all keys and values from `config` as an object.
NOTE: Does not return actual object, just a copy.

### config.set(key, value)
Set `key` to `value`. The file will be updated once you call `config.save`.

### config.setAll(obj)
Set `config`'s object to `obj`. `obj` must be JSON-safe.
NOTE: Will not set `config`'s object to a reference to `obj`, it will be a copy.

### config.save(cb)
Write the config file with JSON encoded version of `config`'s object.
NOTE: If the config was gotten with `load.sync`, this method is also sync.

### config.path
Resolved path to JSON file holding this `config`.
