/* jshint asi:true */

'use strict'

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require) // eslint-disable-line no-undef, no-native-reassign
var fn = require

require = utils // eslint-disable-line no-undef, no-native-reassign

require('is-child-process')
require('is-node-stream')
require('is-typeof-error')
require('letta')
require('on-stream-end')
require('sliced')
require('stream-exhaust')

require = fn // eslint-disable-line no-undef, no-native-reassign

/**
 * Expose `utils` modules
 */

module.exports = utils
