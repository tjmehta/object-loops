/**
 * @module object-loops/values-in
 */
var keysIn = require('101/keys-in')
/**
 * Like `keysIn`, but for values. Includes enumerable key's values from the prototype chain.
 * @function module:object-loops/values-in
 * @param {object} [obj] - object to get all (incl prototype) enumerable key's values from
 * @returns {array} values
 */
module.exports = valuesIn

function valuesIn (obj) {
  return keysIn(obj).map(function (key) {
    return obj[key]
  })
}
