/**
 * @module object-loops/some
 */
var isObject = require('101/is-object')

/**
 * Tests whether some value in the object passes the test implemented by the callback.
 * @function module:object-loops/some
 * @param {object} [obj] - object to iterate through, not accepted if being used directly on Object.prototype
 * @param {someCallback} callback - function to test each value in the object. return truthy to end the loop, falsey otherwise.
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {boolean} if callback returns true, the loop is ended and true is returned (else false)
 */
module.exports = some

function some (obj, callback, thisArg) {
  if (Array.isArray(obj)) {
    return obj.some(callback, thisArg)
  }
  if (!isObject(obj)) {
    throw new TypeError(obj + ' is not an object')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }
  var ret = false
  var keys = Object.keys(obj)

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var val = obj[key]
    var pass = callback.call(thisArg, val, key, obj)

    if (pass) {
      return true
    }
  }

  return ret
}
/**
 * This callback type is called `someCallback` and is displayed as a global symbol.
 * @callback someCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 * @returns {boolean} include -  return true to break loop and return true, false otherwise
 */
