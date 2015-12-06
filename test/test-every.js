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

var isNumber = require('101/is-number')
var noop = require('101/noop')
var every = require('../every')

describe('every', function () {
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
      var callback = sinon.stub().returns(true)
      var thisArg = {}
      obj.every(callback, thisArg)
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
        .onFirstCall().returns(true)
        .onSecondCall().returns(false)
      var thisArg = {}
      var allPass = obj.every(callback, thisArg)
      // asssertions
      expect(callback.callCount).to.equal(2)
      expect(callback.calledOn(thisArg)).to.equal(true)
      expect(callback.firstCall.args[0]).to.equal(1)
      expect(callback.firstCall.args[1]).to.equal('foo')
      expect(callback.firstCall.args[2]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal(2)
      expect(callback.secondCall.args[1]).to.equal('bar')
      expect(callback.secondCall.args[2]).to.equal(obj)
      expect(allPass).to.equal(false)
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
      var callback = sinon.stub().returns(true)
      var thisArg = {}
      var allPass = every(obj, callback, thisArg)
      // assertions
      expect(allPass).to.equal(true)
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
        .onFirstCall().returns(true)
        .onSecondCall().returns(false)
      var thisArg = {}
      var allPass = every(obj, callback, thisArg)
      // asssertions
      expect(callback.callCount).to.equal(2)
      expect(callback.calledOn(thisArg)).to.equal(true)
      expect(callback.firstCall.args[0]).to.equal(1)
      expect(callback.firstCall.args[1]).to.equal('foo')
      expect(callback.firstCall.args[2]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal(2)
      expect(callback.secondCall.args[1]).to.equal('bar')
      expect(callback.secondCall.args[2]).to.equal(obj)
      expect(allPass).to.equal(false)
      done()
    })
    describe('errors', function () {
      it('should throw an error if obj must be an object', function (done) {
        var obj = 'notObject'
        var callback = noop
        var thisArg = {}
        var fn = every.bind(null, obj, callback, thisArg)
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
        var fn = every.bind(null, obj, callback, thisArg)
        expect(fn).to.throw(/must be a function/)
        done()
      })
    })
    describe('use w/ array', function () {
      beforeEach(function (done) {
        sinon.spy(Array.prototype, 'every')
        done()
      })
      afterEach(function (done) {
        Array.prototype.every.restore()
        done()
      })
      it('should use array every', function (done) {
        var callback = isNumber
        var arr = [1, 2, 3]
        expect(every(arr, callback, arr))
          .to.deep.equal(arr.every(callback, arr))
        sinon.assert.calledWith(Array.prototype.every, callback, arr)
        done()
      })
    })
  })
})
