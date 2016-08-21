/**
 * @module object-loops/chain
 */
var dasherize = require('dasherize')
var envIs = require('101/env-is')
var path = require('path')

module.exports = Chain

function Chain (obj) {
  if (!(this instanceof Chain)) {
    return new Chain(obj)
  }
  if (!(obj instanceof Object)) {
    throw new TypeError(obj + ' must be an object')
  }
  this.obj = obj
}
/**
 * returns the modified json object
 */
Chain.prototype.toJSON = function () {
  return this.obj
}
/**
 * Extends Object.prototype with all "object-loops" methods
 * @function module:object-loops
 * @param {boolean} hideWarnings - Will hide warnings that appear if a method already exists.
 */
extendChainPrototype()
function extendChainPrototype (hideWarnings) {
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
    var method = require(filepath)

    Object.defineProperty(Chain.prototype, methodName, {
      value: function () {
        if (!this.obj) {
          throw new TypeError("Cannot call method '" + methodName + "' of " + this.obj + ' (object-loops/chain)')
        } if (typeof this.obj !== 'object') {
          throw new TypeError("Cannot call method '" + methodName + "' on a non-object: " + typeof this.obj + ' (object-loops/chain)')
        }
        var args = Array.prototype.slice.call(arguments)
        args.unshift(this.obj) // sets first arg as object instance
        this.obj = method.apply(null, args)

        return this
      },
      enumerable: false
    })
  })
}
