var methodNames = require('./all-method-names.js')

module.exports = resetObjectPrototype

function resetObjectPrototype (cb) {
  methodNames.forEach(function (methodName) {
    delete Object.prototype[methodName] // eslint-disable-line
  })
  cb()
}
