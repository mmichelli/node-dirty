require('../../test/common');
var COUNT = 1e4,
    dirty = require('dirty')(__dirname+'/../../test/tmp/benchmark-set-drain.dirty'),
    sys = require('sys'),
    drained = false;

var start = +new Date;
for (var i = 0; i < COUNT; i++) {
  dirty.set(i, i);
}

dirty.on('drain', function() {
  var ms = +new Date - start,
      mhz = ((COUNT / (ms / 1000)) / 1e3).toFixed(2),
      million = COUNT / 1e6;

  // Can't use console.log() since since I also test this in ancient node versions
  sys.puts(mhz+' Hz ('+million+' million in '+ms+' ms)');

  drained = true;
});

process.on('exit', function() {
  assert.ok(drained);
});
