var i = require('i')();
var path = require('path');
var fs = require('fs');

var methodNames = fs.readdirSync(path.resolve(__dirname+'/../../'))
  .filter(matches(/.js$/))
  .map(replace('.js', ''))
  .map(camelize);

module.exports = resetObjectPrototype;

function resetObjectPrototype (cb) {
  methodNames.forEach(function (methodName) {
    delete Object.prototype[methodName];
  });
  cb();
}

function matches (re) {
  return function (str) {
    console.log(str, re);
    return re.test(str);
  };
}
function replace (substr) {
  return function (str) {
    return str.replace(substr, '');
  };
}
function camelize (str) {
  return i.camelize(str.replace(/-/g, '_'), false);
}