/**
 * @module object-loops/map
 */
var forEach = require('./for-each')

/**
 * Creates a new object with the results of calling a provided function on every key in the object.
 * @function module:object-loops/map
 * @param {object} [obj] - object to map keys, not accepted if being used directly on Object.prototype
 * @param {mapKeysCallback} callback - function that produces the new key for the new mapped object
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {object} newly created object with mapped keys
 */
module.exports = mapKeys

function mapKeys (obj, callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  var objIsArray = Array.isArray(obj)
  var mapped = objIsArray ? [] : {}
  if (objIsArray) {
    obj.forEach(eachCallback)
  } else {
    forEach(obj, eachCallback)
  }
  function eachCallback (val, key, obj) {
    var newKey = callback.call(thisArg, key, val, obj)
    mapped[newKey] = val
  }
  return mapped
}
/**
 * This callback type is called `mapKeysCallback` and is displayed as a global symbol.
 * @callback mapKeysCallback
 * @param {string} key - object key (used in current iteration)
 * @param {*} val - value for key
 * @param {object} obj - object which keys are being iterated
 * @returns {*} mappedKey - value for key in the new, mapped object
 */
