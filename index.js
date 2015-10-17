/*!
 * letta-value <https://github.com/hybridables/letta-value>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

module.exports = function lettaValue (val) {
  if (utils.isNodeStream(val) || utils.isChildProcess(val)) {
    return utils.letta(utils.onStreamEnd, utils.streamExhaust(val))
  }
  if (val && typeof val.subscribe === 'function') {
    if (val.value) {
      return utils.letta(function () {
        return val.value
      })
    }
    return utils.letta(subscribe, val)
  }
  if (utils.isTypeofError(val)) {
    return utils.letta(function () {
      throw val
    })
  }
  return utils.letta(function () {
    return val
  })
}

/**
 * Callback-style wrapper for `rx.subscribe`
 */

function subscribe (val, callback) {
  val.subscribe(function noop () {}, callback, function onComplete () {
    callback.apply(this, [null].concat(utils.sliced(arguments)))
  }.bind(this))
}
