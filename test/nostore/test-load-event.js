require('../common');
var assert = require('assert');

var dirty = require(global.ROOT_LIB)('');
var isLoaded = false;

dirty.on('load', function() {
  isLoaded = true;
});

setTimeout(function() {
  assert.equal(isLoaded, true);
}, 500);
