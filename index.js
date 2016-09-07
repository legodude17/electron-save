"use strict";
var electron = require('electron');
var path = require('path');
var fs = require('fs');
var saves = path.join((electron.app || electron.remote.app).getPath('userData'), 'saves');

function makeConfig(path, cb) {
  fs.readFile(path, 'utf-8', function (err, data) {
    err && cb(err);
    data = JSON.parse(data);
    cb(null, {
      get(i) {
        return data[i];
      }
      set(i, v) {
        data[i] = v;
      }
      save(cb) {
        fs.writeFile(path, JSON.stringify(data), cb);
      }
    });
  });
}

makeConfig.sync = function makeConfigSync(path, cb) {
  var data = fs.readFileSync(path, 'utf-8');
  data = JSON.parse(data);
  return {
    get: function (i) {
      return data[i];
    }
    set: function (i, v) {
      data[i] = v;
    }
    save: function (cb) {
      fs.writeFileSync(path, JSON.stringify(data));
    }
  };
}

function load(name, cb) {
  var file = path.join(saves, name + '.json');
  fs.access(file, function (err, data) {
    if (err) {
      fs.writeFile(file, '{}', function () {
        makeConfig(file, cb);
      });
    } else {
      makeConfig(file, cb);
    }
  });
}

load.sync = function loadSync(name) {
  var file = path.join(saves, name + '.json');
  try {
    fs.accessSync(file);
    return makeConfig.sync(file);
  } catch (e) {
    fs.writeFileSync(file, '{}');
    return makeConfig.sync(file);
  }
}
