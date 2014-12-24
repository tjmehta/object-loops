var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var sinon = require('sinon');

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var noop = require('101/noop');
var equals = require('101/equals');
var passAny = require('101/pass-any');
var filter = require('../filter');
var equalsOneOrThree = passAny(equals(1), equals(3));

describe('filter', function () {
  describe('prototype', function () {
    before(function (done) {
      require('../index')();
      done();
    });
    after(require('./fixtures/reset-object-prototype'));
    it('should iterate through all the key-value pairs in the object', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      };
      var callback = sinon.spy();
      var thisArg = {};
      obj.filter(callback, thisArg);
      // assertions
      expect(callback.callCount).to.equal(3);
      expect(callback.calledOn(thisArg)).to.equal(true);
      expect(callback.firstCall.args[0]).to.equal(1);
      expect(callback.firstCall.args[1]).to.equal('foo');
      expect(callback.firstCall.args[2]).to.equal(obj);
      expect(callback.secondCall.args[0]).to.equal(2);
      expect(callback.secondCall.args[1]).to.equal('bar');
      expect(callback.secondCall.args[2]).to.equal(obj);
      expect(callback.thirdCall.args[0]).to.equal(3);
      expect(callback.thirdCall.args[1]).to.equal('baz');
      expect(callback.thirdCall.args[2]).to.equal(obj);
      done();
    });
    it('should return an object with new filterped values', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      };
      var thisArg = {};
      var filteredObj = obj.filter(equalsOneOrThree);
      Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        if (equalsOneOrThree(val)) {
          expect(filteredObj[key]).to.equal(obj[key]);
        }
        else {
          expect(filteredObj[key]).to.be.undefined();
        }
      });
      done();
    });
  });
  describe('require', function () {
    it('should iterate through all the key-value pairs in the object', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      };
      var callback = sinon.spy();
      var thisArg = {};
      filter(obj, callback, thisArg);
      // assertions
      expect(callback.callCount).to.equal(3);
      expect(callback.calledOn(thisArg)).to.equal(true);
      expect(callback.firstCall.args[0]).to.equal(1);
      expect(callback.firstCall.args[1]).to.equal('foo');
      expect(callback.firstCall.args[2]).to.equal(obj);
      expect(callback.secondCall.args[0]).to.equal(2);
      expect(callback.secondCall.args[1]).to.equal('bar');
      expect(callback.secondCall.args[2]).to.equal(obj);
      expect(callback.thirdCall.args[0]).to.equal(3);
      expect(callback.thirdCall.args[1]).to.equal('baz');
      expect(callback.thirdCall.args[2]).to.equal(obj);
      done();
    });
    it('should return an object with new filterped values', function (done) {
      var obj = {
        foo: 1,
        bar: 2,
        baz: 3
      };
      var thisArg = {};
      var filteredObj = filter(obj, equalsOneOrThree);
      Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        if (equalsOneOrThree(val)) {
          expect(filteredObj[key]).to.equal(obj[key]);
        }
        else {
          expect(filteredObj[key]).to.be.undefined();
        }
      });
      done();
    });
    describe('errors', function () {
      it('should throw an error if obj is not an object', function (done) {
        var obj = 'notObject';
        var callback = noop;
        var thisArg = {};
        var fn = filter.bind(null, obj, callback, thisArg);
        expect(fn).to.throw(/not an object/);
        done();
      });
      it('should throw an error if callback is not a function', function (done) {
        var obj = {
          foo: 1,
          bar: 2,
          baz: 3
        };
        var callback = 'notFunction';
        var thisArg = {};
        var fn = filter.bind(null, obj, callback, thisArg);
        expect(fn).to.throw(/not a function/);
        done();
      });
    });
  });
});

function multiplyBy (multiplier) {
  return function (multiplicand) {
    return multiplicand * multiplier;
  };
}