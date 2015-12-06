/**
 * @module object-loops/filter
 */
var forEach = require('./for-each')

/**
 * Creates a new object with all entries that pass the test implemented by the provided function.
 * @function module:object-loops/filter
 * @param {object} [obj] - object to filter values, not accepted if being used directly on Object.prototype
 * @param {filterCallback} callback - function to test each value in the object. return true to keep that entry, false otherwise.
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {object} newly created object with filtered values
 */
module.exports = filter

function filter (obj, callback, thisArg) {
  if (Array.isArray(obj)) {
    return obj.filter(callback, thisArg)
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  var filteredObj = {}
  forEach(obj, function (val, key, obj) {
    var include = callback.call(thisArg, val, key, obj)
    if (include) {
      filteredObj[key] = val
    }
  })
  return filteredObj
}
/**
 * This callback type is called `filterCallback` and is displayed as a global symbol.
 * @callback filterCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 * @returns {boolean} include -  return true to keep that entry, false otherwise
 */
