var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var before = lab.before
var after = lab.after
var expect = Code.expect

var keysIn = require('../keys-in')

describe('keysIn', function () {
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
      var objKeys = new Person('hey').keysIn()
      // assertions
      expect(objKeys).to.deep.equal(['name', 'getName'])
      done()
    })
  })

  describe('require', function () {
    it('should get all direct enumerables keys from object', function (done) {
      var objKeys = keysIn(new Person('hey'))
      // assertions
      expect(objKeys).to.deep.equal(['name', 'getName'])
      done()
    })
  })
})
