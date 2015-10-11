# [letta-value][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Extends `letta` to accept and handles more than functions only. Handles all kind of results from `letta`. Basically, creating promise from everything - strings, arrays, objects, functions, generators, generator functions, promises, streams, child processes, observables, maps, symbols, dates and etc.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i letta-value --save
```


## Usage
> For more use-cases see the [tests](./test.js)

- `[val]` **{Mixed}** believe me, everything
- `return` **{Promise}**

**Example**

```js
const lettaValue = require('letta-value')

// strings
lettaValue('foo bar').then(res => {
  console.log(res) // => 'foo bar'
})

// numbers
lettaValue(123).then(res => {
  console.log(res) // => 123
})

// errors
lettaValue(new Error('foo err'))
.catch(err => {
  console.error(err.message) // => 'foo err'
})

// functions
lettaValue(function noopFn () {})
.then(res => {
  // res is the noop function
  // it won't be executed or anything
  console.log(res.name) // => 'noopFn'
}, console.error)
```

## Extended examples

Meant to be used with `letta`, because `letta` only accept function.  
The following is [`always-done`](https://github.com/hybridables/always-done) package, which is completely built on top of [`letta`](https://github.com/hybridables/letta) and `letta-value`

```js
var letta = require('letta')
var lettaValue = require('letta-value')

module.exports = function alwaysDone (val) {
  if (typeof val === 'function') {
    return letta.apply(this, arguments).then(lettaValue)
  }
  return lettaValue(val)
}
```

And few examples. For more see the documentation, examples and tests of [`always-done`](https://github.com/hybridables/always-done).

```js
const fs = require('fs')
const alwaysDone = require('always-done')
```

Reading file as buffer with core module function `fs.readFileSync`.  
This example also shows correct handling of optional arguments.

```js
alwaysDone(fs.readFileSync, 'package.json')
.then(res => {
  console.log(Buffer.isBuffer(res)) // => true
}, console.error)
```

### Parsing JSON string

```js
alwaysDone('{"foo":"bar"}')
.then(JSON.parse)
.then(data => {
  console.log(data) // => { foo: 'bar' }
}, console.error)
```

### Stringify given object and ident it

```js
alwaysDone(JSON.stringify, {foo: 'bar'}, null, 2)
.then(data => {
  console.log(data)
  // =>
  // {
  //   "foo": "bar"
  // }
}, console.error)
```

### Reading and parsing package.json

```js
alwaysDone(fs.readFileSync, 'package.json', 'utf8')
.then(JSON.parse)
.then(data => {
  console.log(data.name) // => 'pkg-name'
}, console.error)
```


## Related
- [letta](https://github.com/hybridables/letta): Let's move to promises! Drop-in replacement for `co@4`, but on steroids. Accepts sync, async and generator functions.
- [native-or-another](https://github.com/tunnckocore/native-or-another): Always will expose native `Promise` if available, otherwise `Bluebird` but only if you don't give another promise module like `q` or `promise` or what you want.
- [native-promise](https://github.com/tunnckocore/native-promise): Get native `Promise` or falsey value if not available.
- [redolent](https://github.com/tunnckocore/redolent): Simple promisify a callback-style function with sane defaults. Support promisify-ing sync functions.


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/letta-value/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/letta-value
[npmjs-img]: https://img.shields.io/npm/v/letta-value.svg?label=letta-value

[license-url]: https://github.com/hybridables/letta-value/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/hybridables/letta-value
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/letta-value.svg

[travis-url]: https://travis-ci.org/hybridables/letta-value
[travis-img]: https://img.shields.io/travis/hybridables/letta-value.svg

[coveralls-url]: https://coveralls.io/r/hybridables/letta-value
[coveralls-img]: https://img.shields.io/coveralls/hybridables/letta-value.svg

[david-url]: https://david-dm.org/hybridables/letta-value
[david-img]: https://img.shields.io/david/hybridables/letta-value.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg