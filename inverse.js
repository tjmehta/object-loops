/**
 * @module object-loops/inverse
 */
var isInteger = require('101/is-integer')
var reduce = require('./reduce')

/**
 * Creates a new object with keys and values flipped.
 * @function module:object-loops/inverse
 * @param {object} [obj] - object to inverse keys and values, not accepted if being used directly on Object.prototype
 * @returns {object} newly created object with inversed values
 */
module.exports = inverse

function inverse (obj) {
  if (Array.isArray(obj)) {
    var valsAreInts = obj.every(isInteger)
    return obj.reduce(flip, valsAreInts ? [] : {})
  }
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError(obj + ' must be an object')
  }
  return reduce(obj, flip, {})
}

function flip (inversed, val, key) {
  inversed[val] = key
  return inversed
}
