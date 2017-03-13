/**
 * @module object-loops/filter-to-array
 */
var forEach = require('./for-each')

/**
 * Creates a new array with all entries that pass the test implemented by the provided function.
 * @function module:object-loops/filter-to-array
 * @param {object} [obj] - object to filter values, not accepted if being used directly on Object.prototype
 * @param {filterCallback} callback - function to test each value in the array. return true to keep that entry, false otherwise.
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {Array} newly created array with filtered values
 */
module.exports = filterToArray

function filterToArray (obj, callback, thisArg) {
  if (Array.isArray(obj)) {
    return obj.filter(callback, thisArg)
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  var filteredList = []
  forEach(obj, function (val, key, obj) {
    var include = callback.call(thisArg, val, key, obj)
    if (include) {
      filteredList.push(val)
    }
  })
  return filteredList
}
/**
 * This callback type is called `filterCallback` and is displayed as a global symbol.
 * @callback filterCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 * @returns {boolean} include -  return true to keep that entry, false otherwise
 */
