object-loops [![Build Status](https://travis-ci.org/tjmehta/object-loops.svg)](https://travis-ci.org/tjmehta/object-loops)
============

Functional methods like forEach, map, filter, and other ES5 Array methods for Objects in javascript

# Installation

`npm install object-loops`

# Usage

#### You can require each method individually `object-loop/<loop>`

```js
var filter = require('object-loops/filter')
var forEach = require('object-loops/for-each')
var mapKeys = require('object-loops/map-keys')
var map = require('object-loops/map')
var reduce = require('object-loops/reduce')
// usage
forEach({ x:10, y: 20 }, callback)
filter({ x:10, y: 20 }, callback)
mapKeys({ x:10, y: 20 }, callback)
map({ x:10, y: 20 }, callback)
reduce({ x:10, y: 20 }, callback)
```

#### If you want to chain multiple object-loops use `object-loop/chain`

```js
var chain = require('object-loops/chain')
chain({ x:10, y: 20 })
  .forEach(callback)
  .filter(callback)
  .mapKeys(callback)
  .map(callback)
  .reduce(callback)
  .toJSON() // must be called at the end to return modified object

```

#### If you want to use forEach, map, reduce, filter, etc methods directly on objects:

```js
require('object-loops')() // extends Object.prototype
obj.forEach(callback)
obj.filter(callback)
obj.mapKeys(callback)
obj.map(callback)
obj.reduce(callback)
```


## forEach

Executes a provided function once per each object value.

 * @param {object} [obj] - object to forEach, not accepted if being used directly on Object.prototype
 * @param {function} callback - function that will be invoked once for each key-value pair
 * @param {*} [thisArg] - optional. context to bind to callback

```js
var forEach = require('object-loops/for-each')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30
}
var keyConcat = ''
var valSum = 0
forEach(obj, function (val, key, obj) {
  keyConcat += key
  valSum += val
})
keyConcat // = 'foobarbaz'
valSum    // = 60
```

## map

Creates a new object with the results of calling a provided function on every value in the object.

 * @param {object} [obj] - object to map values, not accepted if being used directly on Object.prototype
 * @param {function} callback - function that produces the new value for the new, mapped object
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {object} newly created object with mapped values

```js
var map = require('object-loops/map')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30
}
var mappedObj = map(obj, function (val, key, obj) {
  return val*2
})
mappedObj /* Each val multiplied by 2
{
  foo: 20,
  bar: 40,
  baz: 60
}
*/
```

## filter

Creates a new object with all entries that pass the test implemented by the provided function.

 * @param {object} [obj] - object to filter values, not accepted if being used directly on Object.prototype
 * @param {function} callback - function to test each value in the object. return true to keep that entry, false otherwise.
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {object} newly created object with filtered values

```js
var filter = require('object-loops/filter')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30,
  qux: 40,
}
var filteredObj = filter(obj, function (val, key, obj) {
  return val > 25
})
filteredObj /* Only has entries with vals greater than 25
{
  baz: 30,
  qux: 40
}
*/
```

## reduce

Applies a function against an accumulator and each value of the object to reduce it to a single value.

 * @param {object} [obj] - object to reduce values, not accepted if being used directly on Object.prototype
 * @param {function} callback - function to test each value in the object. return true to keep that entry, false otherwise.
 * @param {*} [initialValue] - optional. object to use as the first argument to the first call of the callback
 * @returns {*} finalValue - final value returned by reduction, or just first val if only one exists.

```js
var reduce = require('object-loops/reduce')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30
}
var sum = reduce(obj, function (prevVal, val, key, obj) {
  return prevVal + val
})
sum // 60
```

## License

MIT