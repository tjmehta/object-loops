var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()
var sinon = require('sinon')

var describe = lab.describe
var it = lab.it
var before = lab.before
var after = lab.after
var expect = Code.expect

var noop = require('101/noop')
var mapKeys = require('../map-keys')

describe('mapKeys', function () {
  describe('prototype', function () {
    before(function (done) {
      require('../index')()
      done()
    })
    after(require('./fixtures/reset-object-prototype'))
    it('should iterate through all the key-value pairs in the object', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      }
      var callback = sinon.spy()
      var thisArg = {}
      obj.mapKeys(callback, thisArg)
      // assertions
      expect(callback.callCount).to.equal(3)
      expect(callback.calledOn(thisArg)).to.equal(true)
      expect(callback.firstCall.args[0]).to.equal('foo')
      expect(callback.firstCall.args[1]).to.equal(1)
      expect(callback.firstCall.args[2]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal('bar')
      expect(callback.secondCall.args[1]).to.equal(2)
      expect(callback.secondCall.args[2]).to.equal(obj)
      expect(callback.thirdCall.args[0]).to.equal('baz')
      expect(callback.thirdCall.args[1]).to.equal(3)
      expect(callback.thirdCall.args[2]).to.equal(obj)
      done()
    })
    it('should return an object with new mapped values', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      }
      var mappedObj = obj.mapKeys(prependWith('yolo'))
      Object.keys(obj).forEach(function (key) {
        expect(mappedObj[key]).to.equal(obj[prependWith('yolo')(key)])
      })
      done()
    })
  })
  describe('require', function () {
    it('should iterate through all the key-value pairs in the object', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      }
      var callback = sinon.spy()
      var thisArg = {}
      mapKeys(obj, callback, thisArg)
      // assertions
      expect(callback.callCount).to.equal(3)
      expect(callback.calledOn(thisArg)).to.equal(true)
      expect(callback.firstCall.args[0]).to.equal('foo')
      expect(callback.firstCall.args[1]).to.equal(1)
      expect(callback.firstCall.args[2]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal('bar')
      expect(callback.secondCall.args[1]).to.equal(2)
      expect(callback.secondCall.args[2]).to.equal(obj)
      expect(callback.thirdCall.args[0]).to.equal('baz')
      expect(callback.thirdCall.args[1]).to.equal(3)
      expect(callback.thirdCall.args[2]).to.equal(obj)
      done()
    })
    it('should return an object with new mapped values', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      }
      var mappedObj = mapKeys(obj, prependWith('yolo'))
      Object.keys(obj).forEach(function (key) {
        var newKey = prependWith('yolo')(key)
        expect(mappedObj[newKey]).to.equal(obj[key])
      })
      done()
    })
    describe('errors', function () {
      it('should throw an error if obj must be an object', function (done) {
        var obj = 'notObject'
        var callback = noop
        var thisArg = {}
        var fn = mapKeys.bind(null, obj, callback, thisArg)
        expect(fn).to.throw(/must be an object/)
        done()
      })
      it('should throw an error if callback must be a function', function (done) {
        var obj = {
          foo: 1,
          bar: 2,
          baz: 3
        }
        var callback = 'notFunction'
        var thisArg = {}
        var fn = mapKeys.bind(null, obj, callback, thisArg)
        expect(fn).to.throw(/must be a function/)
        done()
      })
    })
    describe('use w/ array', function () {
      it('should iterate through all the key-value pairs in the object', function (done) {
        var arr = [
          1,
          2,
          3
        ]
        var callback = sinon.spy()
        var thisArg = {}
        mapKeys(arr, callback, thisArg)
        // assertions
        expect(callback.callCount).to.equal(3)
        expect(callback.calledOn(thisArg)).to.equal(true)
        expect(callback.firstCall.args[0]).to.equal(0) // index
        expect(callback.firstCall.args[1]).to.equal(1)
        expect(callback.firstCall.args[2]).to.equal(arr)
        expect(callback.secondCall.args[0]).to.equal(1) // index
        expect(callback.secondCall.args[1]).to.equal(2)
        expect(callback.secondCall.args[2]).to.equal(arr)
        expect(callback.thirdCall.args[0]).to.equal(2) // index
        expect(callback.thirdCall.args[1]).to.equal(3)
        expect(callback.thirdCall.args[2]).to.equal(arr)
        done()
      })
      it('should return an object with new mapped values', function (done) {
        var arr = [
          1,
          2,
          3
        ]
        var mapped = mapKeys(arr, add(1))
        expect(mapped).instanceOf(Array)
        Object.keys(arr).forEach(function (key) {
          var intKey = parseInt(key, 10)
          var newKey = add(1)(intKey)
          expect(mapped[newKey]).to.equal(arr[key])
        })
        done()
      })
    })
  })
})

function prependWith (pre) {
  return function (key) {
    return pre + key
  }
}
function add (n) {
  return function (i) {
    return i + n
  }
}
