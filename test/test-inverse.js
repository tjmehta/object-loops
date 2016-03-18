var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var before = lab.before
var after = lab.after
var expect = Code.expect

var inverse = require('../inverse')

describe('inverse', function () {
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
      var ret = obj.inverse()
      expect(ret).to.deep.equal({
        '1': 'foo',
        '2': 'bar',
        '3': 'baz'
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
      var ret = inverse(obj)
      expect(ret).to.deep.equal({
        '1': 'foo',
        '2': 'bar',
        '3': 'baz'
      })
      done()
    })
    it('should iterate through all the key-value pairs in an array (integer values)', function (done) {
      var arr = [
        2,
        4,
        6
      ]
      var ret = inverse(arr)
      expect(ret).to.deep.equal([
        undefined,
        undefined,
        0,
        undefined,
        1,
        undefined,
        2
      ])
      done()
    })
    it('should iterate through all the key-value pairs in an array (non-integer values)', function (done) {
      var arr = [
        2,
        'yo',
        6
      ]
      var ret = inverse(arr)
      expect(ret).to.deep.equal({
        '2': 0,
        'yo': 1,
        '6': 2
      })
      done()
    })
    describe('errors', function () {
      it('should throw an error if obj must be an object', function (done) {
        var obj = 'notObject'
        var fn = inverse.bind(null, obj)
        expect(fn).to.throw(/must be an object/)
        done()
      })
    })
  })
})
