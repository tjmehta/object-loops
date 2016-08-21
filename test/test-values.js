var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var before = lab.before
var after = lab.after
var expect = Code.expect

var values = require('../values')

describe('values', function () {
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
    it('should get all direct enumerables values from object', function (done) {
      var objValues = new Person('hey').values()
      // assertions
      expect(objValues).to.deep.equal(['hey'])
      done()
    })
  })

  describe('require', function () {
    it('should get all direct enumerables values from object', function (done) {
      var objValues = values(new Person('hey'))
      // assertions
      expect(objValues).to.deep.equal(['hey'])
      done()
    })
  })
})
