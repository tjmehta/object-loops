var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var before = lab.before
var after = lab.after
var expect = Code.expect

var keys = require('../keys')

describe('keys', function () {
  function Person (name) {
    this.name = name
  }
  Person.prototype.getName = function () {
    return this.name
  }

  describe('prototype', function () {
    before(function (done) {
      require('../index')()
      done()
    })
    after(require('./fixtures/reset-object-prototype'))
    it('should get all direct enumerables keys from object', function (done) {
      var objKeys = new Person('hey').keys()
      // assertions
      expect(objKeys).to.deep.equal(['name'])
      done()
    })
  })

  describe('require', function () {
    it('should get all direct enumerables keys from object', function (done) {
      var objKeys = keys(new Person('hey'))
      // assertions
      expect(objKeys).to.deep.equal(['name'])
      done()
    })
  })
})
