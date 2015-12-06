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

var equals = require('101/equals')
var noop = require('101/noop')
var some = require('../some')

describe('some', function () {
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
      obj.some(callback, thisArg)
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
    it('should return iterate through object until callback returns true', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      }
      var foo = {}
      var callback = foo.cb = sinon.stub()
      callback
        .onFirstCall().returns(false)
        .onSecondCall().returns(true)
      var thisArg = {}
      var foundTwo = obj.some(callback, thisArg)
      // asssertions
      expect(callback.callCount).to.equal(2)
      expect(callback.calledOn(thisArg)).to.equal(true)
      expect(callback.firstCall.args[0]).to.equal(1)
      expect(callback.firstCall.args[1]).to.equal('foo')
      expect(callback.firstCall.args[2]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal(2)
      expect(callback.secondCall.args[1]).to.equal('bar')
      expect(callback.secondCall.args[2]).to.equal(obj)
      expect(foundTwo).to.equal(true)
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
      some(obj, callback, thisArg)
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
    it('should return iterate through object until callback returns true', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      }
      var foo = {}
      var callback = foo.cb = sinon.stub()
      callback
        .onFirstCall().returns(false)
        .onSecondCall().returns(true)
      var thisArg = {}
      var foundTwo = some(obj, callback, thisArg)
      // asssertions
      expect(callback.callCount).to.equal(2)
      expect(callback.calledOn(thisArg)).to.equal(true)
      expect(callback.firstCall.args[0]).to.equal(1)
      expect(callback.firstCall.args[1]).to.equal('foo')
      expect(callback.firstCall.args[2]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal(2)
      expect(callback.secondCall.args[1]).to.equal('bar')
      expect(callback.secondCall.args[2]).to.equal(obj)
      expect(foundTwo).to.equal(true)
      done()
    })
    describe('errors', function () {
      it('should throw an error if obj is not an object', function (done) {
        var obj = 'notObject'
        var callback = noop
        var thisArg = {}
        var fn = some.bind(null, obj, callback, thisArg)
        expect(fn).to.throw(/not an object/)
        done()
      })
      it('should throw an error if callback is not a function', function (done) {
        var obj = {
          foo: 1,
          bar: 2,
          baz: 3
        }
        var callback = 'notFunction'
        var thisArg = {}
        var fn = some.bind(null, obj, callback, thisArg)
        expect(fn).to.throw(/not a function/)
        done()
      })
    })
    describe('use w/ array', function () {
      beforeEach(function (done) {
        sinon.spy(Array.prototype, 'some')
        done()
      })
      afterEach(function (done) {
        Array.prototype.some.restore()
        done()
      })
      it('should use array some', function (done) {
        var callback = equals(2)
        var arr = [1, 2, 3]
        expect(some(arr, callback, arr))
          .to.deep.equal(arr.some(callback, arr))
        sinon.assert.calledWith(Array.prototype.some, callback, arr)
        done()
      })
    })
  })
})
