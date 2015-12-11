/* Copyright (c) 2014-2015 Richard Rodger */
'use strict'

var Lab = require('lab')
var assert = require('assert')

var TransportTest = require('seneca-transport-test')

// Test shortcuts
var lab = exports.lab = Lab.script()
var describe = lab.describe
var test = lab.test

describe('redis-transport', function () {
  test('happy-any', function (done) {
    TransportTest.foo_test('redis-queue-transport', require, done, 'redis-queue', -6379)
  })

  test('happy-pin', function (done) {
    TransportTest.foo_pintest('redis-queue-transport', require, done, 'redis-queue', -6379)
  })

  test('options', function (done) {
    var a = require('seneca')({
      log: 'silent',
      timeout: 23555
    })
      .use('../redis-queue-transport.js')

    var so = a.options()
    assert.ok(so.timeout)
    assert.equal(so.timeout, 23555)

    var b = require('seneca')({
      log: 'silent',
      timeout: null
    })
      .use('../redis-queue-transport.js')

    so = b.options()
    assert.ok(!so.timeout)

    done()
  })
})
