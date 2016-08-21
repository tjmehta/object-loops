/**
 * @module object-loops
 */
var dasherize = require('dasherize')
var exists = require('101/exists')
var envIs = require('101/env-is')
var path = require('path')

/**
 * Extends Object.prototype with all "object-loops" methods
 * @function module:object-loops
 * @param {boolean} hideWarnings - Will hide warnings that appear if a method already exists.
 */
module.exports = extendObjectPrototype

function extendObjectPrototype (hideWarnings) {
  [
    'every',
    'inverse',
    'filter',
    'findKey',
    'find',
    'forEach',
    'keys',
    'keysIn',
    'mapKeys',
    'map',
    'reduce',
    'some',
    'values',
    'valuesIn'
  ].forEach(function (methodName) {
    var filename = dasherize(methodName)
    var filepath = path.join(__dirname, filename)
    if (Object.prototype[methodName] && !hideWarnings) {
      console.log('warn: "Object.prototype.' + methodName + '" already exists.')
    } else {
      var method = require(filepath)
      Object.defineProperty(Object.prototype, methodName, { // eslint-disable-line
        value: function () {
          if (this === global || !exists(this)) {
            throw new TypeError('this is null or not defined for ' + method)
          }
          var args = Array.prototype.slice.call(arguments)
          args.unshift(this) // sets first arg as object instance
          return method.apply(this, args)
        },
        enumerable: false,
        configurable: envIs('test') // hack for tests
      })
    }
  })
}
