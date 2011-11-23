require('../common');
var DB_FILE = global.TEST_TMP+'/flush.dirty';
    db = require(global.ROOT_LIB)(DB_FILE),
    fs = require('fs');

db.set('foo', 'bar');
db.on('drain', function() {
  assert.strictEqual(
    fs.readFileSync(DB_FILE, 'utf-8'),
    JSON.stringify({key: 'foo', 'val': 'bar'})+'\n'
  );
});
