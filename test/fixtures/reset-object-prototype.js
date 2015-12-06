var methodNames = [
  'every',
  'forEach',
  'filter',
  'map',
  'mapKeys',
  'reduce',
  'some'
]

module.exports = resetObjectPrototype

function resetObjectPrototype (cb) {
  methodNames.forEach(function (methodName) {
    delete Object.prototype[methodName] // eslint-disable-line
  })
  cb()
}
