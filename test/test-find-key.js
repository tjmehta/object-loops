var Code = require('code')
var equals = require('101/equals')
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
var findKey = require('../find-key')

describe('findKey', function () {
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
      obj.findKey(callback, thisArg)
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
    it('should iterate through all the key-value pairs in the object (if item not found)', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      }
      var callback = sinon.spy()
      var thisArg = {}
      findKey(obj, callback, thisArg)
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
    it('should break loop if item is found', function (done) {
      var obj = [
        'foo',
        'bar',
        'baz'
      ]
      var callback = sinon.spy(equals('bar'))
      var thisArg = {}
      var ret = findKey(obj, callback, thisArg)
      // assertions
      expect(callback.callCount).to.equal(2)
      expect(callback.calledOn(thisArg)).to.equal(true)
      expect(callback.firstCall.args[0]).to.equal('foo')
      expect(callback.firstCall.args[1]).to.equal(0)
      expect(callback.firstCall.args[2]).to.equal(obj)
      expect(callback.secondCall.args[0]).to.equal('bar')
      expect(callback.secondCall.args[1]).to.equal(1)
      expect(callback.secondCall.args[2]).to.equal(obj)
      expect(ret).to.equal(1)
      done()
    })
    it('should break loop if item is found (weird array)', function (done) {
      var obj = [
        'foo',
        'bar',
        'baz'
      ]
      obj['wut'] = 'hello'
      var callback = sinon.spy(equals('hello'))
      var thisArg = {}
      var ret = findKey(obj, callback, thisArg)
      // assertions
      expect(callback.callCount).to.equal(3)
      expect(ret).to.equal(undefined)
      done()
    })
    describe('errors', function () {
      it('should throw an error if obj must be an object', function (done) {
        var obj = 'notObject'
        var callback = noop
        var thisArg = {}
        var fn = findKey.bind(null, obj, callback, thisArg)
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
        var fn = findKey.bind(null, obj, callback, thisArg)
        expect(fn).to.throw(/must be a function/)
        done()
      })
    })
    if (Array.prototype.findIndex) {
      describe('use w/ array', function () {
        beforeEach(function (done) {
          sinon.spy(Array.prototype, 'findIndex')
          done()
        })
        afterEach(function (done) {
          Array.prototype.findIndex.restore()
          done()
        })
        it('should use array findIndex', function (done) {
          var arr = [1, 2, 3]
          var callback = noop
          var index = arr.findIndex(callback, arr)
          expect(findKey(arr, callback))
            .to.equal(~index ? index : undefined)
          sinon.assert.calledOn(Array.prototype.findIndex, arr)
          sinon.assert.calledWith(Array.prototype.findIndex, callback)
          done()
        })
      })
      describe('use w/ array', function () {
        var findIndex = Array.prototype.findIndex
        beforeEach(function (done) {
          delete Array.prototype.findIndex
          done()
        })
        afterEach(function (done) {
          Array.prototype.findIndex = findIndex // eslint-disable-line no-extend-native
          done()
        })
        it('should break loop if item is found (weird array)', function (done) {
          var obj = [
            'foo',
            'bar',
            'baz'
          ]
          obj['wut'] = 'hello'
          var callback = sinon.spy(equals('hello'))
          var thisArg = {}
          var ret = findKey(obj, callback, thisArg)
          // assertions
          expect(callback.callCount).to.equal(3)
          expect(ret).to.equal(undefined)
          done()
        })
      })
    }
  })
})
