var methodNames = [
  'forEach',
  'filter',
  'map',
  'mapKeys',
  'reduce'
]

module.exports = resetObjectPrototype

function resetObjectPrototype (cb) {
  methodNames.forEach(function (methodName) {
    delete Object.prototype[methodName] // eslint-disable-line
  })
  cb()
}
