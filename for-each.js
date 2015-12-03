/**
 * @module object-loops/for-each
 */
var isObject = require('101/is-object')
/**
 * Executes a provided function once per each object value.
 * @function module:object-loops/for-each
 * @param {object} [obj] - object to forEach, not accepted if being used directly on Object.prototype
 * @param {forEachCallback} callback - function that will be invoked once for each key-value pair
 * @param {*} [thisArg] - context to bind to callback
 */
module.exports = forEach

function forEach (obj, callback, thisArg) {
  if (Array.isArray(obj)) {
    return obj.forEach(callback, thisArg)
  }
  if (!isObject(obj)) {
    throw new TypeError(obj + ' is not an object')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }
  Object.keys(obj).forEach(function (key) {
    var val = obj[key]
    callback.call(thisArg, val, key, obj)
  })
}
/**
 * This callback type is called `forEachCallback` and is displayed as a global symbol.
 * @callback forEachCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 */
