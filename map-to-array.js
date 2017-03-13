/**
 * @module object-loops/map-to-array
 */
var forEach = require('./for-each')

/**
 * Creates a new array with the results of calling a provided function on every value in the object.
 * @function module:object-loops/map-to-array
 * @param {object} [obj] - object to map values, not accepted if being used directly on Object.prototype
 * @param {mapCallback} callback - function that produces the new value for the new mapped array
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {Array} newly created array with mapped values
 */
module.exports = mapToArray

function mapToArray (obj, callback, thisArg) {
  if (Array.isArray(obj)) {
    return obj.map(callback, thisArg)
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  var mappedList = []
  forEach(obj, function (val, key, obj) {
    mappedList.push(callback.call(thisArg, val, key, obj))
  })
  return mappedList
}
/**
 * This callback type is called `mapCallback` and is displayed as a global symbol.
 * @callback mapCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 * @returns {*} mappedValue - value for key in the new, mapped object
 */
