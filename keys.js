/**
 * @module object-loops/keys
 */

/**
 * Equivalent to `Object.keys`. Implemented specifically for chain.
 * @function module:object-loops/keys
 * @param {object} [obj] - object to get hasOwnProperty enumerable keys from
 * @returns {array} keys
 */
module.exports = keys

function keys (obj) {
  return Object.keys(obj)
}
