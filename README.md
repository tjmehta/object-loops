object-loops [![Build Status](https://travis-ci.org/tjmehta/object-loops.svg)](https://travis-ci.org/tjmehta/object-loops)
============

Functional methods like forEach, map, filter, and other ES5 Array methods for Objects in javascript

# Installation

`npm install object-loops`

# Usage

#### If you want to use forEach, map, reduce, filter, etc methods directly on objects:

```
require('object-loops')();
// obj.forEach()
```

#### If you do not like the idea of extending Object.prototype you can require each method individually:

```
var objForEach = require('object-loops/for-each');
objForEach({ x:10, y: 20 }, callback, thisArg);
```

## forEach

Executes a provided function once per each object value.

 * @param {object} [obj] - object to forEach, not accepted if being used directly on Object.prototype
 * @param {function} callback - function that will be invoked once for each key-value pair
 * @param {*} [thisArg] - optional. context to bind to callback

```js
require('object-loops')(); // extends Object.prototype

var obj = {
  foo: 10,
  bar: 20,
  baz: 30
};
var keyConcat = '';
var valSum = 0;
obj.forEach(function (val, key, obj) {
  keyConcat += key;
  valSum += val;
});
keyConcat; // = 'foobarbaz'
valSum;    // = 60
```

## map

Creates a new object with the results of calling a provided function on every value in the object.

 * @param {object} [obj] - object to map values, not accepted if being used directly on Object.prototype
 * @param {function} callback - function that produces the new value for the new, mapped object
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {object} newly created object with mapped values

```js
require('object-loops')(); // extends Object.prototype

var obj = {
  foo: 10,
  bar: 20,
  baz: 30
};
var mappedObj = obj.map(function (val, key, obj) {
  return val*2;
});
mappedObj; /* Each val multiplied by 2
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
require('object-loops')(); // extends Object.prototype

var obj = {
  foo: 10,
  bar: 20,
  baz: 30,
  qux: 40,
};
var filteredObj = obj.filter(function (val, key, obj) {
  return val > 25;
});
filteredObj; /* Only has entries with vals greater than 25
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
require('object-loops')(); // extends Object.prototype

var obj = {
  foo: 10,
  bar: 20,
  baz: 30
};
var valSum = obj.reduce(function (prevVal, val, key, obj) {
  return prevVal + val;
});
valSum; // 60
```

## License

MIT