var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()
var sinon = require('sinon')

var describe = lab.describe
var it = lab.it
var before = lab.before
var after = lab.after
var beforeEach = lab.beforeEach
var afterEach = lab.afterEach
var expect = Code.expect

var noop = require('101/noop')
function sum (x, y) { return x + y }
var reduce = require('../reduce')

describe('reduce', function () {
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
      var initialValue = 100
      obj.reduce(callback, initialValue)
      // assertions
      expect(callback.callCount).to.equal(3)
      expect(callback.firstCall.args[0]).to.equal(initialValue)
      expect(callback.firstCall.args[1]).to.equal(1)
      expect(callback.firstCall.args[2]).to.equal('foo')
      expect(callback.firstCall.args[3]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal(undefined)
      expect(callback.secondCall.args[1]).to.equal(2)
      expect(callback.secondCall.args[2]).to.equal('bar')
      expect(callback.secondCall.args[3]).to.equal(obj)
      expect(callback.thirdCall.args[0]).to.equal(undefined)
      expect(callback.thirdCall.args[1]).to.equal(3)
      expect(callback.thirdCall.args[2]).to.equal('baz')
      expect(callback.thirdCall.args[3]).to.equal(obj)
      done()
    })
    it('should return an object with new reduced values', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      }
      var finalValue = obj.reduce(sum)
      expect(finalValue).to.equal(1 + 2 + 3)
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
      var initialValue = 100
      reduce(obj, callback, initialValue)
      // assertions
      expect(callback.callCount).to.equal(3)
      expect(callback.firstCall.args[0]).to.equal(100)
      expect(callback.firstCall.args[1]).to.equal(1)
      expect(callback.firstCall.args[2]).to.equal('foo')
      expect(callback.firstCall.args[3]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal(undefined)
      expect(callback.secondCall.args[1]).to.equal(2)
      expect(callback.secondCall.args[2]).to.equal('bar')
      expect(callback.secondCall.args[3]).to.equal(obj)
      expect(callback.thirdCall.args[0]).to.equal(undefined)
      expect(callback.thirdCall.args[1]).to.equal(3)
      expect(callback.thirdCall.args[2]).to.equal('baz')
      expect(callback.thirdCall.args[3]).to.equal(obj)
      done()
    })
    it('should return an object with new reduced values', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      }
      var finalValue = reduce(obj, sum)
      expect(finalValue).to.equal(1 + 2 + 3)
      done()
    })
    describe('object with only one value, and no initialValue provided', function () {
      it('should return the first value', function (done) {
        var obj = {
          foo: 100
        }
        var callback = sinon.spy()
        var finalValue = reduce(obj, callback)
        expect(finalValue).to.equal(100)
        done()
      })
    })
    describe('errors', function () {
      it('should throw an error if obj must be an object', function (done) {
        var obj = 'notObject'
        var callback = noop
        var fn = reduce.bind(null, obj, callback)
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
        var fn = reduce.bind(null, obj, callback)
        expect(fn).to.throw(/must be a function/)
        done()
      })
      it('should throw an error if the object is empty and no initialValue provided', function (done) {
        var obj = {}
        var fn = reduce.bind(null, obj, noop)
        expect(fn).to.throw(/empty object/)
        done()
      })
    })
    describe('use w/ array', function () {
      beforeEach(function (done) {
        sinon.spy(Array.prototype, 'reduce')
        done()
      })
      afterEach(function (done) {
        Array.prototype.reduce.restore()
        done()
      })
      it('should use array reduce', function (done) {
        var arr = [1, 2, 3]
        var callback = sum
        expect(reduce(arr, callback, 20))
          .to.equal(arr.reduce(callback, 20))
        sinon.assert.calledWith(Array.prototype.reduce, callback, 20)
        done()
      })
      it('should use array reduce w/out initialValue', function (done) {
        var arr = [1, 2, 3]
        var callback = sum
        expect(reduce(arr, callback))
          .to.equal(arr.reduce(callback))
        sinon.assert.calledWith(Array.prototype.reduce, callback)
        done()
      })
    })
  })
})
