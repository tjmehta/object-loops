var Code = require('code')
var Lab = require('lab')
var noop = require('101/noop')
var sinon = require('sinon')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

var allMethodNames = require('./fixtures/all-method-names.js')
var chain = require('../chain')

describe('chain', function () {
  it('should allow chaining of methods (noop chain)', function (done) {
    var filterCb = sinon.stub().returns(true)
    var mapCb = sinon.stub().returnsArg(0)
    var mapKeysCb = sinon.stub().returnsArg(0)
    var reduceCb = sinon.stub().returnsArg(3)
    var input = { x: 1, y: 1 }
    var output = chain(input)
      .filter(filterCb)
      .map(mapCb)
      .mapKeys(mapKeysCb)
      .reduce(reduceCb)
      .keys()
      .map(mapCb)
      .mapKeys(mapKeysCb)
      .reduce(reduceCb)
      .toJSON()
    expect(output).to.deep.equal(['x', 'y'])
    done()
  })
  it('should have all methods', function (done) {
    var chainable = chain({})
    allMethodNames.forEach(function (name) {
      expect(chainable[name]).to.be.a.function()
    })
    done()
  })
  describe('errors', function () {
    it('should error if invoked w/ non-object', function (done) {
      chain([]) // works w/ arrays
      chain({}) // works w/ objects
      expect(chain.bind(null, 'boom')).to.throw(/must be an object/)
      done()
    })
    it('should error when chaining off when last step returns null or undefined (like array.foreach)', function (done) {
      var obj = { x: 1, y: 1 }
      var chainObj = chain(obj)
      var chainObj2 = chain(obj)
      expect(chainObj.forEach(noop).filter.bind(chainObj, noop)).to.throw(/Cannot call method.*of.*undefined/)
      expect(chainObj2.reduce(returnNull).filter.bind(chainObj2, noop)).to.throw(/Cannot call method.*of.*null/)
      function returnNull () {
        return null
      }
      done()
    })
    it('should error when chaining off when last step returns non-object', function (done) {
      var obj = { x: 1, y: 1 }
      var chainObj = chain(obj)
      expect(chainObj.reduce(returnHello).filter.bind(chainObj, noop)).to.throw(/Cannot call method.*non-object/)
      function returnHello () {
        return 'hello'
      }
      done()
    })
  })
})
