/*!
 * letta-value <https://github.com/hybridables/letta-value>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('assertit')
var letta = require('letta')
var isBuffer = require('is-buffer')
var lettaValue = require('./index')
var Observable = require('rx').Observable

// see `always-done` for more tests
// this fn is absolute copy of `always-done` module
function alwaysDone (val) {
  if (typeof val === 'function') {
    return letta.apply(this, arguments).then(lettaValue)
  }
  return lettaValue(val)
}

test('should accept string and handle it from `.then`', function (done) {
  lettaValue('foo bar baz').then(function (res) {
    test.strictEqual(res, 'foo bar baz')
    done()
  }, done)
})

test('should accept array and handle it from `.then`', function (done) {
  lettaValue(['foo', 'bar', 'baz']).then(function (res) {
    test.deepEqual(res, ['foo', 'bar', 'baz'])
    done()
  }, done)
})

test('should accept Error instance and catch it from `.catch`', function (done) {
  lettaValue(new Error('foo err')).catch(function (err) {
    test.strictEqual(err.message, 'foo err')
    done()
  })
})

test('should accept streams directly and handle successful completion', function (done) {
  var readable = fs.createReadStream('package.json')
  alwaysDone(readable).then(function (res) {
    test.strictEqual(res, undefined)
    done()
  }, done)
})

test('should accept streams directly and handle failing completion', function (done) {
  var readable = fs.createReadStream('foobar.json')
  alwaysDone(readable).catch(function (err) {
    test.strictEqual(err.code, 'ENOENT')
    done()
  })
})

test('should accept empty observable and handle completion', function (done) {
  var observable = Observable.empty()
  alwaysDone(observable).then(function (res) {
    test.strictEqual(res, undefined)
    done()
  }, done)
})

test('should accept successful observable value and handle it', function (done) {
  var observable = Observable.return([1, 2, 3])
  alwaysDone(observable).then(function (res) {
    test.deepEqual(res, [1, 2, 3])
    done()
  }, done)
})

test('should accept failing observable and `.catch` it', function (done) {
  var observable = Observable.throw(new Error('observable error'))
  alwaysDone(observable).catch(function (err) {
    test.strictEqual(err.message, 'observable error')
    done()
  })
})

test('should accept sync function which return empty observable', function (done) {
  alwaysDone(function success () {
    return Observable.empty()
  }).then(function (res) {
    test.strictEqual(res, undefined)
    done()
  }, done)
})

test('should accept sync function returning successful observable value', function (done) {
  alwaysDone(function successValue () {
    return Observable.return(123)
  }).then(function (res) {
    test.strictEqual(res, 123)
    done()
  }, done)
})

test('should accept sync function returning failing observable', function (done) {
  alwaysDone(function failure () {
    return Observable.throw(new Error('observable err'))
  }).catch(function (err) {
    test.strictEqual(err.message, 'observable err')
    done()
  })
})

test('should accept sync function which returns stream and handle completion', function (done) {
  alwaysDone(function () {
    return fs.createReadStream('package.json')
  }).then(function (res) {
    test.strictEqual(res, undefined)
    done()
  }, done)
})

test('should accept sync function which returns failing stream completion', function (done) {
  alwaysDone(function () {
    return fs.createReadStream('foobar.json')
  }).catch(function (err) {
    test.strictEqual(err.code, 'ENOENT')
    done()
  })
})

test('should accept sync (fs.readFileSync) function and handle buffer', function (done) {
  alwaysDone(fs.readFileSync, 'package.json')
  .then(function (buf) {
    test.strictEqual(isBuffer(buf), true)
    done()
  }, done)
})

test('should accept asynchronous function and get buffer', function (done) {
  var read = fs.readFile
  alwaysDone(read, 'package.json').then(function (res) {
    test.strictEqual(isBuffer(res), true)
    done()
  }, done)
})

test('should accept async (callback) functions and handle utf8 result', function (done) {
  alwaysDone(fs.readFile, 'package.json', 'utf8')
  .then(JSON.parse)
  .then(function (data) {
    test.strictEqual(data.name, 'letta-value')
    done()
  }, done)
})
