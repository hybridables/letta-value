/*!
 * letta-value <https://github.com/hybridables/letta-value>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var letta = require('letta')
var isError = require('is-typeof-error')
var isNodeStream = require('is-node-stream')
var isChildProcess = require('is-child-process')

module.exports = function lettaValue (val) {
  if (isNodeStream(val) || isChildProcess(val)) {
    return letta(require('on-stream-end'), require('stream-exhaust')(val))
  }
  if (val && typeof val.subscribe === 'function') {
    if (val.value) {
      return letta(function () {
        return val.value
      })
    }
    return letta(subscribe, val)
  }
  if (isError(val)) {
    return letta(function () {
      throw val
    })
  }
  return letta(function () {
    return val
  })
}

/**
 * Callback-style wrapper for `rx.subscribe`
 */

function subscribe (val, callback) {
  val.subscribe(function noop () {}, callback, function onComplete () {
    callback.apply(this, [null].concat(require('sliced')(arguments)))
  }.bind(this))
}
