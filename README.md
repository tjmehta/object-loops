object-loops [![Build Status](https://travis-ci.org/tjmehta/object-loops.svg)](https://travis-ci.org/tjmehta/object-loops)
============

Functional methods like forEach, map, filter, and other Array methods for Objects in javascript

# Installation

`npm install object-loops`

# Index

[chain](https://github.com/tjmehta/object-loops#usage)

[every](https://github.com/tjmehta/object-loops#every)

[inverse](https://github.com/tjmehta/object-loops#inverse)

[filter](https://github.com/tjmehta/object-loops#filter)

[findKey](https://github.com/tjmehta/object-loops#findKey)

[find](https://github.com/tjmehta/object-loops#find)

[forEach](https://github.com/tjmehta/object-loops#forEach)

[keys](https://github.com/tjmehta/object-loops#keys)

[keysIn](https://github.com/tjmehta/object-loops#keysIn)

[mapKeys](https://github.com/tjmehta/object-loops#mapKeys)

[map](https://github.com/tjmehta/object-loops#map)

[reduce](https://github.com/tjmehta/object-loops#reduce)

[some](https://github.com/tjmehta/object-loops#some)

[values](https://github.com/tjmehta/object-loops#values)

[valuesIn](https://github.com/tjmehta/object-loops#valuesIn)

# Usage

#### You can require each method individually `object-loops/<loop>`

```js
var filter = require('object-loops/filter')
var forEach = require('object-loops/for-each')
var mapKeys = require('object-loops/map-keys')
var map = require('object-loops/map')
var reduce = require('object-loops/reduce')
//... and more
// usage
forEach({ x:10, y: 20 }, callback)
filter({ x:10, y: 20 }, callback)
mapKeys({ x:10, y: 20 }, callback)
map({ x:10, y: 20 }, callback)
reduce({ x:10, y: 20 }, callback)
```

#### If you want to chain multiple object-loops use `object-loops/chain`

```js
var chain = require('object-loops/chain')
chain({ x:10, y: 20 })
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

## every

Tests whether every value in the object passes the test implemented by the callback.

 * @function module:object-loops/every
 * @param {object} [obj] - object to iterate through, not accepted if being used directly on Object.prototype
 * @param {everyCallback} callback - function to test each value in the object. return falsey to end the loop, truthy otherwise.
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {boolean} if callback returns false, the loop is ended and false is returned (else false)

```js
var every = require('object-loops/every')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30,
  qux: 40,
}
var allGreaterThan25 = every(obj, function (val, key, obj) {
  return val > 25
})
allGreaterThan25 // false
*/
```

## inverse

Creates a new object with keys and values flipped.

* @param {object} [obj] - object to inverse keys and values, not accepted if being used directly on Object.prototype
* @returns {object} newly created object with inversed values

```js
var inverse = require('object-loops/inverse')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30
}
var inversedObj = inverse(obj)
inversedObj /* keys and vals are flipped
{
  '10': 'foo',
  '20': 'bar',
  '30': 'baz'
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

## find

Find the value of the the object that passes the test implemented by the callback.

* @param {object} [obj] - object to iterate through, not accepted if being used directly on Object.prototype
* @param {findCallback} callback - function to test each value in the object. return truthy to end the loop and return index, falsey otherwise.
* @param {*} [thisArg] - optional. context to bind to callback
* @returns {*} if callback returns true, the loop is ended and the passing `val` is returned (else undefined)

```js
var find = require('object-loops/find')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30,
  qux: 40,
}
var key = find(obj, function (val, key, obj) {
  return val > 25
})
key // 30
var notfound = find(obj, function (val, key, obj) {
  return val > 100
})
notfound // undefined
*/
```

## findKey

Find the key of the the object that passes the test implemented by the callback. Very similar to `Array.prototype.findIndex`

* @param {object} [obj] - object to iterate through, not accepted if being used directly on Object.prototype
* @param {findKeyCallback} callback - function to test each value in the object. return truthy to end the loop and return index, falsey otherwise.
* @param {*} [thisArg] - optional. context to bind to callback
* @returns {*} if callback returns true, the loop is ended and the passing `key` is returned (else undefined)

```js
var findKey = require('object-loops/find-key')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30,
  qux: 40,
}
var key = findKey(obj, function (val, key, obj) {
  return val > 25
})
key // 'baz'
var notfound = findKey(obj, function (val, key, obj) {
  return val > 100
})
notfound // undefined
*/
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

## keys

Equivalent to `Object.keys`. Implemented specifically for chain.

```js
var chain = require('object-loops/chain')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30
}
chain(obj)
  .keys()
  .toJSON()
// ['foo', 'bar', 'baz']
```

## keysIn

Like to `keys`, but includes enumerable keys from the prototype chain.

```js
var keysIn = require('object-loops/keys-in')

function Person (name) {
  this.name = name
}
Person.prototype.getName = function () {
  return this.name
}

var person = new Person('foo')
keysIn(obj)
// ['name', 'getName']
// for comparison, `keys` would return ['name']
```

## mapKeys

Creates a new object with the results of calling a provided function on every key in the object.

 * @param {object} [obj] - object to map keys, not accepted if being used directly on Object.prototype
 * @param {mapKeysCallback} callback - function that produces the new key for the new mapped object
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {object} newly created object with mapped keys

```js
var mapKeys = require('object-loops/map-keys')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30
}
var mappedObj = mapKeys(obj, function (key, val, obj) {
  return key + 'New'
})
mappedObj /* Each key is concated w/ 'New'
{
  fooNew: 10,
  barNew: 20,
  bazNew: 30
}
*/
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

## some

Tests whether some value in the object passes the test implemented by the callback.

 * @function module:object-loops/some
 * @param {object} [obj] - object to iterate through, not accepted if being used directly on Object.prototype
 * @param {someCallback} callback - function to test each value in the object. return truthy to end the loop, falsey otherwise.
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {boolean} if callback returns true, the loop is ended and true is returned (else false)

```js
var some = require('object-loops/some')

var obj = {
  foo: 10,
  bar: 20,
  baz: 30,
  qux: 40,
}
var anyGreaterThan25 = some(obj, function (val, key, obj) {
  return val > 25
})
anyGreaterThan25 // true
*/
```

## values

Like to `keys`, but returns direct enumerable values.

```js
var values = require('object-loops/values')

function Person (name) {
  this.name = name
}
Person.prototype.getName = function () {
  return this.name
}

var person = new Person('foo')
values(obj)
// ['foo']
// for comparison, `valuesIn` would return ['foo', Person.prototype.getName]
```

## valuesIn

Like to `keys`, but returns direct enumerable values including prototype chain.

```js
var valuesIn = require('object-loops/values-in')

function Person (name) {
  this.name = name
}
Person.prototype.getName = function () {
  return this.name
}

var person = new Person('foo')
valuesIn(obj)
// ['foo', Person.prototype.getName]
```

## License

MIT
