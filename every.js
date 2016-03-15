/**
 * @module object-loops/every
 */

/**
 * Tests whether every value in the object passes the test implemented by the callback.
 * @function module:object-loops/every
 * @param {object} [obj] - object to iterate through, not accepted if being used directly on Object.prototype
 * @param {everyCallback} callback - function to test each value in the object. return falsey to end the loop, truthy otherwise.
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {boolean} if callback returns false, the loop is ended and false is returned (else false)
 */
module.exports = every

function every (obj, callback, thisArg) {
  if (Array.isArray(obj)) {
    return obj.every(callback, thisArg)
  }
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError(obj + ' must be an object')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  var ret = true
  var keys = Object.keys(obj)

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var val = obj[key]
    var pass = callback.call(thisArg, val, key, obj)

    if (!pass) {
      return false
    }
  }

  return ret
}
/**
 * This callback type is called `everyCallback` and is displayed as a global symbol.
 * @callback everyCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 * @returns {boolean} include -  return false to break loop and return false, true otherwise
 */
