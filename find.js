/**
 * @module object-loops/find
 */
var findKey = require('./find-key')

/**
 * Find the value of the the object that passes the test implemented by the callback.
 * @function module:object-loops/find
 * @param {object} [obj] - object to iterate through, not accepted if being used directly on Object.prototype
 * @param {findCallback} callback - function to test each value in the object. return truthy to end the loop and return index, falsey otherwise.
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {*} if callback returns true, the loop is ended and the passing `val` is returned (else undefined)
 */
module.exports = find

function find (obj, callback, thisArg) {
  var key = findKey(obj, callback, thisArg)
  return key ? obj[key] : undefined
}

/**
 * This callback type is called `findCallback` and is displayed as a global symbol.
 * @callback findCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 * @returns {boolean} include -  return true to break loop and return value, false otherwise
 */
