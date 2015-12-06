/**
 * @module object-loops/map
 */
var forEach = require('./for-each')

/**
 * Creates a new object with the results of calling a provided function on every value in the object.
 * @function module:object-loops/map
 * @param {object} [obj] - object to map values, not accepted if being used directly on Object.prototype
 * @param {mapCallback} callback - function that produces the new value for the new mapped object
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {object} newly created object with mapped values
 */
module.exports = map

function map (obj, callback, thisArg) {
  if (Array.isArray(obj)) {
    return obj.map(callback, thisArg)
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  var mappedObj = {}
  forEach(obj, function (val, key, obj) {
    mappedObj[key] = callback.call(thisArg, val, key, obj)
  })
  return mappedObj
}
/**
 * This callback type is called `mapCallback` and is displayed as a global symbol.
 * @callback mapCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 * @returns {*} mappedValue - value for key in the new, mapped object
 */
