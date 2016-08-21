/**
 * @module object-loops/values
 */

/**
 * Like `Object.keys`, but for values
 * @function module:object-loops/values
 * @param {object} [obj] - object to get hasOwnProperty enumerable key's values from
 * @returns {array} values
 */
module.exports = values

function values (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key]
  })
}
