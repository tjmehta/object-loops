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
var forEach = require('../for-each')

describe('forEach', function () {
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
      obj.forEach(callback, thisArg)
      // assertions
      expect(callback.callCount).to.equal(3)
      expect(callback.calledOn(thisArg)).to.equal(true)
      expect(callback.firstCall.args[0]).to.equal(1)
      expect(callback.firstCall.args[1]).to.equal('foo')
      expect(callback.firstCall.args[2]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal(2)
      expect(callback.secondCall.args[1]).to.equal('bar')
      expect(callback.secondCall.args[2]).to.equal(obj)
      expect(callback.thirdCall.args[0]).to.equal(3)
      expect(callback.thirdCall.args[1]).to.equal('baz')
      expect(callback.thirdCall.args[2]).to.equal(obj)
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
      forEach(obj, callback, thisArg)
      // assertions
      expect(callback.callCount).to.equal(3)
      expect(callback.calledOn(thisArg)).to.equal(true)
      expect(callback.firstCall.args[0]).to.equal(1)
      expect(callback.firstCall.args[1]).to.equal('foo')
      expect(callback.firstCall.args[2]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal(2)
      expect(callback.secondCall.args[1]).to.equal('bar')
      expect(callback.secondCall.args[2]).to.equal(obj)
      expect(callback.thirdCall.args[0]).to.equal(3)
      expect(callback.thirdCall.args[1]).to.equal('baz')
      expect(callback.thirdCall.args[2]).to.equal(obj)
      done()
    })
    describe('errors', function () {
      it('should throw an error if obj must be an object', function (done) {
        var obj = 'notObject'
        var callback = noop
        var thisArg = {}
        var fn = forEach.bind(null, obj, callback, thisArg)
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
        var fn = forEach.bind(null, obj, callback, thisArg)
        expect(fn).to.throw(/must be a function/)
        done()
      })
    })
    describe('use w/ array', function () {
      beforeEach(function (done) {
        sinon.spy(Array.prototype, 'forEach')
        done()
      })
      afterEach(function (done) {
        Array.prototype.forEach.restore()
        done()
      })
      it('should use array forEach', function (done) {
        var arr = [1, 2, 3]
        var callback = noop
        expect(forEach(arr, callback, arr))
          .to.equal(arr.forEach(callback, arr))
        sinon.assert.calledWith(Array.prototype.forEach, callback, arr)
        done()
      })
    })
  })
})
