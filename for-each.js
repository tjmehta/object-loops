/**
 * @module object-loops/for-each
 */

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
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError(obj + ' must be an object')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
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
