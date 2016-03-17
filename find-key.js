/**
 * @module object-loops/find-key
 */

var isInteger = require('101/is-integer')

var castArrayKey = function (key) {
  var num = parseInt(key, 10)
  return isNaN(num) ? key : num
}

/**
 * Find the key of the the object that passes the test implemented by the callback.
 * @function module:object-loops/find-key
 * @param {object} [obj] - object to iterate through, not accepted if being used directly on Object.prototype
 * @param {findKeyCallback} callback - function to test each value in the object. return truthy to end the loop and return index, falsey otherwise.
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {*} if callback returns true, the loop is ended and the passing `key` is returned (else undefined)
 */
module.exports = findKey

function findKey (obj, callback, thisArg) {
  var isArray = Array.isArray(obj)
  if (isArray && obj.findIndex) {
    /* $lab:coverage:off$ */ // not covered in envs that don't have `findIndex`
    var index = obj.findIndex(callback, thisArg)
    return ~index ? index : undefined
    /* $lab:coverage:on$ */
  }
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError(obj + ' must be an object')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  var ret
  var keys = Object.keys(obj)

  if (isArray) {
    keys = Object.keys(obj).map(castArrayKey).filter(isInteger)
  }

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var val = obj[key]
    var pass = callback.call(thisArg, val, key, obj)

    if (pass) {
      return key
    }
  }

  return ret
}
/**
 * This callback type is called `findKeyCallback` and is displayed as a global symbol.
 * @callback findKeyCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 * @returns {boolean} include -  return true to break loop and return key, false otherwise
 */
