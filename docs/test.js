(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],4:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],5:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require("buffer").Buffer)
},{"base64-js":1,"buffer":5,"ieee754":7}],6:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":9}],7:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],8:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],9:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],10:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],11:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":13}],12:[function(require,module,exports){
(function (process){
'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


}).call(this,require('_process'))
},{"_process":13}],13:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],14:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":15}],15:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};
},{"./_stream_readable":17,"./_stream_writable":19,"core-util-is":6,"inherits":8,"process-nextick-args":12}],16:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":18,"core-util-is":6,"inherits":8}],17:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":15,"./internal/streams/BufferList":20,"./internal/streams/destroy":21,"./internal/streams/stream":22,"_process":13,"core-util-is":6,"events":4,"inherits":8,"isarray":10,"process-nextick-args":12,"safe-buffer":23,"string_decoder/":24,"util":2}],18:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":15,"core-util-is":6,"inherits":8}],19:[function(require,module,exports){
(function (process,global,setImmediate){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"./_stream_duplex":15,"./internal/streams/destroy":21,"./internal/streams/stream":22,"_process":13,"core-util-is":6,"inherits":8,"process-nextick-args":12,"safe-buffer":23,"timers":30,"util-deprecate":31}],20:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":23,"util":2}],21:[function(require,module,exports){
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":12}],22:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":4}],23:[function(require,module,exports){
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":5}],24:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":23}],25:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":26}],26:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":15,"./lib/_stream_passthrough.js":16,"./lib/_stream_readable.js":17,"./lib/_stream_transform.js":18,"./lib/_stream_writable.js":19}],27:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":26}],28:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":19}],29:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":4,"inherits":8,"readable-stream/duplex.js":14,"readable-stream/passthrough.js":25,"readable-stream/readable.js":26,"readable-stream/transform.js":27,"readable-stream/writable.js":28}],30:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":13,"timers":30}],31:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],32:[function(require,module,exports){
(function (setImmediate){
const Tonic = require('@optoolco/tonic')

class TonicAccordion extends Tonic {
  defaults () {
    return {
      multiple: false
    }
  }

  static stylesheet () {
    return `
      tonic-accordion {
        display: block;
        border: 1px solid var(--tonic-border, black);
      }
    `
  }

  qs (s) {
    return this.querySelector(s)
  }

  qsa (s) {
    return [...this.querySelectorAll(s)]
  }

  setVisibility (id) {
    const trigger = document.getElementById(id)
    if (!trigger) return

    const allowMultiple = this.hasAttribute('data-allow-multiple')
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true'

    if (!isExpanded && !allowMultiple) {
      const triggers = this.qsa('.tonic--accordion-header button')
      const panels = this.qsa('.tonic--accordion-panel')

      triggers.forEach(el => el.setAttribute('aria-expanded', 'false'))
      panels.forEach(el => el.setAttribute('hidden', ''))
    }

    const panelId = trigger.getAttribute('aria-controls')

    if (isExpanded) {
      trigger.setAttribute('aria-expanded', 'false')
      const currentPanel = document.getElementById(panelId)
      if (currentPanel) currentPanel.setAttribute('hidden', '')
      return
    }

    trigger.setAttribute('aria-expanded', 'true')
    const currentPanel = document.getElementById(panelId)
    this.state.selected = id
    if (currentPanel) currentPanel.removeAttribute('hidden')
  }

  click (e) {
    const trigger = Tonic.match(e.target, 'button')
    if (!trigger) return

    this.setVisibility(trigger.id)
  }

  keydown (e) {
    const trigger = Tonic.match(e.target, 'button.tonic--title')
    if (!trigger) return

    const CTRL = e.ctrlKey
    const PAGEUP = e.code === 'PageUp'
    const PAGEDOWN = e.code === 'PageDown'
    const UPARROW = e.code === 'ArrowUp'
    const DOWNARROW = e.code === 'ArrowDown'
    const END = e.metaKey && e.code === 'ArrowDown'
    const HOME = e.metaKey && e.code === 'ArrowUp'

    const ctrlModifier = CTRL && (PAGEUP || PAGEDOWN)
    const triggers = this.qsa('button.tonic--title')

    if ((UPARROW || DOWNARROW) || ctrlModifier) {
      const index = triggers.indexOf(e.target)
      const direction = (PAGEDOWN || DOWNARROW) ? 1 : -1
      const length = triggers.length
      const newIndex = (index + length + direction) % length

      triggers[newIndex].focus()
      e.preventDefault()
    }

    if (HOME || END) {
      switch (e.key) {
        case HOME:
          triggers[0].focus()
          break
        case END:
          triggers[triggers.length - 1].focus()
          break
      }
      e.preventDefault()
    }
  }

  connected () {
    const id = this.state.selected || this.props.selected
    if (!id) return

    setImmediate(() => this.setVisibility(id))
  }

  render () {
    const {
      multiple
    } = this.props

    if (multiple) this.setAttribute('data-allow-multiple', '')

    return this.html`
      ${this.nodes}
    `
  }
}

class TonicAccordionSection extends Tonic {
  static stylesheet () {
    return `
      tonic-accordion-section {
        display: block;
      }

      tonic-accordion-section:not(:last-of-type) {
        border-bottom: 1px solid var(--tonic-border, black);
      }

      tonic-accordion-section h4 {
        margin: 0;
      }

      tonic-accordion-section .tonic--accordion-header {
        display: flex;
      }

      tonic-accordion-section button {
        font-size: 14px;
        text-align: left;
        padding: 20px;
        position: relative;
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        width: 100%;
      }

      tonic-accordion-section button:focus {
        outline: none;
      }

      tonic-accordion-section button:focus .tonic--label {
        border-bottom: 3px solid Highlight;
      }

      tonic-accordion-section [hidden] {
        display: none;
      }

      tonic-accordion-section .tonic--accordion-panel {
        padding: 10px 50px 20px 20px;
      }

      tonic-accordion-section .tonic--accordion-header .tonic--arrow {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 50px;
      }

      tonic-accordion-section .tonic--accordion-header .tonic--arrow:before {
        content: "";
        width: 8px;
        height: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translateY(-50%) translateX(-50%) rotate(135deg);
        -moz-transform: translateY(-50%) translateX(-50%) rotate(135deg);
        transform: translateY(-50%) translateX(-50%) rotate(135deg);
        border-top: 1px solid var(--tonic-primary, #333);
        border-right: 1px solid var(--tonic-primary, #333);
      }

      tonic-accordion-section .tonic--accordion-header[aria-expanded="true"] .tonic--arrow:before {
        -webkit-transform: translateY(-50%) translateX(-50%) rotate(315deg);
        -moz-transform: translateY(-50%) translateX(-50%) rotate(315deg);
        transform: translateY(-50%) translateX(-50%) rotate(315deg);
        margin-top: 3px;
      }
    `
  }

  render () {
    const {
      id,
      name,
      label
    } = this.props

    return this.html`
      <h4
        class="tonic--accordion-header"
        role="heading">
        <button
          class="tonic--title"
          id="tonic--accordion-header-${id}"
          name="${name}"
          aria-expanded="false"
          aria-controls="tonic--accordion-panel-${id}">
          <span class="tonic--label">${label}</span>
          <span class="tonic--arrow"></span>
        </button>
      </h4>
      <div
        class="tonic--accordion-panel"
        id="tonic--accordion-panel-${id}"
        aria-labelledby="tonic--accordion-header-${id}"
        role="region"
        hidden>
        ${this.nodes}
      </div>
    `
  }
}

module.exports = {
  TonicAccordion,
  TonicAccordionSection
}

}).call(this,require("timers").setImmediate)
},{"@optoolco/tonic":49,"timers":30}],33:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicBadge extends Tonic {
  defaults () {
    return {
      count: 0
    }
  }

  get value () {
    return this.state.count
  }

  set value (value) {
    this.state.count = value
    this.reRender()
  }

  static stylesheet () {
    return `
      tonic-badge * {
        box-sizing: border-box;
      }

      tonic-badge .tonic--notifications {
        width: 40px;
        height: 40px;
        text-align: center;
        padding: 10px;
        position: relative;
        background-color: var(--tonic-background, #fff);
        border-radius: 8px;
      }

      tonic-badge span:after {
        content: '';
        width: 8px;
        height: 8px;
        display: none;
        position: absolute;
        top: 7px;
        right: 6px;
        background-color: var(--tonic-notification, #f66);
        border: 2px solid var(--tonic-background, #fff);
        border-radius: 50%;
      }

      tonic-badge .tonic--notifications.tonic--new span:after {
        display: block;
      }

      tonic-badge span {
        color: var(--tonic-primary, #333);
        font: 15px var(--tonic-subheader, 'Arial', sans-serif);
        letter-spacing: 1px;
        text-align: center;
      }
    `
  }

  willConnect () {
    this.state.count = this.props.count
  }

  render () {
    const {
      theme
    } = this.props

    let count = this.state.count

    if (typeof count === 'undefined') {
      count = this.props.count
    }

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const countText = (count > 99) ? '99' : String(count)
    const classes = ['tonic--notifications']
    if (count > 0) classes.push('tonic--new')

    return this.html`
      <div ... ${{ class: classes.join(' ') }}>
        <span>${countText}</span>
      </div>
    `
  }
}

module.exports = {
  TonicBadge
}

},{"@optoolco/tonic":49}],34:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="badge">
  <h2>Badge</h2>

  <div id="badge-1" class="test-container">
    <span>Default</span>
    <tonic-badge id="tonic-badge-1"></tonic-badge>
  </div>

  <div id="badge-2" class="test-container">
    <span>count="6"</span>
    <tonic-badge id="tonic-badge-2" count="6"></tonic-badge>
  </div>

  <div id="badge-3" class="test-container">
    <span>theme="light"</span>
    <tonic-badge id="tonic-badge-3" count="1" theme="light"></tonic-badge>
  </div>

  <div id="badge-4" class="dark test-container">
    <span>theme="dark"</span>
    <tonic-badge id="tonic-badge-4" count="1" theme="dark"></tonic-badge>
  </div>

</section>
`)

tape('{{badge-1}} has correct default state', t => {
  const container = qs('#badge-1')
  const component = qs('tonic-badge', container)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.value, 0, 'the default value is zero')

  t.end()
})

tape('{{badge-2}} shows a count', t => {
  const container = qs('#badge-2')
  const component = qs('tonic-badge', container)
  const span = qs('span', component)
  const notification = qs('.tonic--new', component)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('count'), 'the component has a count attribute')
  t.equal(component.value, span.textContent, 'the badge shows the correct value')
  t.ok(notification, 'badge shows new notifications')

  t.end()
})

tape('badge shows tonic--new style', t => {
  const span1 = qs('#badge-1 tonic-badge span')
  const span2 = qs('#badge-2 tonic-badge span')

  const styles1 = window.getComputedStyle(span1, ':after')
  const styles2 = window.getComputedStyle(span2, ':after')

  t.equal(styles1.display, 'none')
  t.equal(styles2.display, 'block')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],35:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicButton extends Tonic {
  get value () {
    return this.props.value
  }

  get form () {
    return this.querySelector('button').form
  }

  get disabled () {
    return this.props.disabled === true
  }

  set disabled (state) {
    this.props.disabled = state
  }

  defaults () {
    return {
      height: '40px',
      width: '150px',
      margin: '5px',
      autofocus: 'false',
      async: false,
      radius: '2px',
      borderWidth: '1px',
      textColorDisabled: 'var(--tonic-disabled)',
      backgroundColor: 'transparent'
    }
  }

  static stylesheet () {
    return `
      tonic-button {
        display: inline-block;
      }

      tonic-button button {
        color: var(--tonic-button, #333);
        width: auto;
        min-height: 40px;
        font: 12px var(--tonic-subheader, 'Arial', sans-serif);
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px 8px 5px 8px;
        position: relative;
        background-color: transparent;
        border: 1px solid var(--tonic-button, #333);
        transition: all 0.3s ease;
        appearance: none;
      }

      tonic-button button[disabled],
      tonic-button button.tonic--active {
        color: var(--tonic-medium, #999);
        background-color: var(--tonic-background, #fff);
        border-color: var(--tonic-background, #fff);
      }

      tonic-button button[disabled] {
        pointer-events: none;
        user-select: none;
      }

      tonic-button button:not([disabled]):hover,
      tonic-button button:not(.tonic--loading):hover {
        color: var(--tonic-window, #fff) !important;
        background-color: var(--tonic-button, #333) !important;
        border-color: var(--tonic-button, #333) !important;
        cursor: pointer;
      }

      tonic-button button.tonic--loading {
        color: transparent !important;
        background: var(--tonic-medium, #999);
        border-color: var(--tonic-medium, #999);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      tonic-button button.tonic--loading:hover {
        color: transparent !important;
        background: var(--tonic-medium, #999) !important;
        border-color: var(--tonic-medium, #999) !important;
      }

      tonic-button button.tonic--loading:before {
        margin-top: -8px;
        margin-left: -8px;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        opacity: 1;
        transform: translateX(-50%) translateY(-50%);
        border: 2px solid white;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      tonic-button button:before {
        content: '';
        width: 14px;
        height: 14px;
        opacity: 0;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
  }

  loading (state) {
    const button = this.querySelector('button')
    const method = state ? 'add' : 'remove'
    if (button) button.classList[method]('tonic--loading')
  }

  click (e) {
    const disabled = this.props.disabled === 'true'
    const async = this.props.async === 'true'
    const href = this.props.href

    if (async && !disabled) {
      this.loading(true)
    }

    if (href) {
      const target = this.getAttribute('target')

      if (target && target !== '_self') {
        window.open(href)
      } else {
        window.open(href, '_self')
      }
    }
  }

  styles () {
    const {
      width,
      height,
      margin,
      radius,
      fill,
      disabled,
      borderColor,
      borderWidth,
      textColor,
      textColorDisabled
    } = this.props

    return {
      button: {
        width,
        height,
        color: disabled && disabled === 'true' ? textColorDisabled : textColor,
        backgroundColor: fill,
        borderRadius: radius,
        borderColor: fill || borderColor,
        borderWidth: borderWidth
      },
      wrapper: {
        width,
        height,
        margin
      }
    }
  }

  render () {
    const {
      value,
      type,
      disabled,
      autofocus,
      active,
      async,
      tabindex
    } = this.props

    let classes = []

    if (active) classes.push('tonic--active')
    classes = classes.join(' ')

    if (tabindex) this.removeAttribute('tabindex')

    let label = ''

    if (this.querySelector('style')) {
      label = this.querySelector('button').textContent
    } else {
      label = this.textContent || type || 'Button'
    }

    return this.html`
      <div class="tonic--button--wrapper" styles="wrapper">
        <button ... ${{
          styles: 'button',
          async: String(async),
          disabled: disabled && disabled !== 'false',
          autofocus,
          alt: label,
          value,
          type,
          tabindex,
          class: classes
        }}>${label}</button>
      </div>
    `
  }
}

module.exports = { TonicButton }

},{"@optoolco/tonic":49}],36:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

const sleep = n => new Promise(resolve => setTimeout(resolve, n))

document.body.appendChild(html`
<section id="button">
  <h2>Button</h2>

  <div id="button-1" class="test-container">
    <span>Default Button</span>
    <tonic-button></tonic-button>
  </div>

  <div id="button-2" class="test-container">
    <span>Button has text content</span>
    <tonic-button>Text Content</tonic-button>
  </div>

  <div id="button-2-5" class="test-container">
    <span>Button has text content</span>
    <tonic-button value="v"></tonic-button>
  </div>

  <div id="button-3" class="test-container">
    <span>disabled="true"</span>
    <tonic-button disabled="true">Button</tonic-button>
  </div>

  <div id="button-4" class="test-container">
    <span>disabled="false"</span>
    <tonic-button disabled="false">Button</tonic-button>
  </div>

  <div id="button-5" class="test-container">
    <span>Has all attributes</span>
    <tonic-button
      margin="10px"
      type="reset"
      autofocus="true"
      width="200px"
      height="50px"
      tabindex="1"
      radius="5px"></tonic-button>
  </div>

  <div id="button-6" class="test-container">
    <span>fill="rgb(240, 102, 83)"</span>
    <tonic-button
      fill="rgb(240, 102, 83)"
      text-color="white">Button</tonic-button>
  </div>

  <div id="button-7" class="test-container">
    <span>border-color, border-width, text-color</span>
    <tonic-button
      border-color="rgb(240, 102, 83)"
      border-width="3px"
      text-color="rgb(240, 102, 83)">Button</tonic-button>
  </div>

  <div id="button-8" class="test-container">
    <span>async="true"</span>
    <tonic-button async="true">Button</tonic-button>
  </div>

  <div id="button-9" class="test-container">
    <span>async="false"</span>
    <tonic-button async="false">Button</tonic-button>
  </div>

  <div id="button-10" class="test-container">
    <span>tabindex="0"</span>
    <tonic-button tabindex="0">Button</tonic-button>
  </div>

  <div id="button-11" class="test-container">
    <span>href and target</span>
    <tonic-button target="_blank" href="https://google.com">target="_blank"</tonic-button>
    <tonic-button target="_self" href="https://google.com">target="_self"</tonic-button>
    <tonic-button href="https://google.com">No target</tonic-button>
  </div>

</section>
`)

tape('{{button-1}} has correct default state', t => {
  const container = qs('#button-1')
  const component = qs('tonic-button', container)
  const wrapper = qs('.tonic--button--wrapper', component)
  const button = qs('button', component)
  const isLoading = button.classList.contains('tonic--loading')

  t.plan(6)

  t.ok(wrapper, 'component was constructed with a wrapper')
  t.ok(button, 'component was constructed with a button element')
  t.ok(!button.hasAttribute('disabled'), 'does not have disabled attribute')
  t.equal(button.getAttribute('autofocus'), 'false', 'autofocus is false')
  t.equal(button.getAttribute('async'), 'false', 'async attribute is false')
  t.equal(isLoading, false, 'loading class is not applied')

  t.end()
})

tape('has styles', t => {
  const container = qs('#button-1 tonic-button')
  const button = qs('button', container)

  const styles = window.getComputedStyle(button)
  t.equal(styles.color, 'rgb(51, 51, 51)')

  t.end()
})

tape('{{button-2}} has textContent', t => {
  const container = qs('#button-2')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.plan(4)

  t.ok(button, 'the component was constructed with a button')
  t.ok(!component.hasAttribute('value'), 'the component does not have a value attribute')
  t.ok(button.textContent, 'the button has text content')
  t.equal(button.textContent, button.getAttribute('alt'), 'button has alt attribute that matches value')

  t.end()
})

tape('{{button-2-5}} has value', t => {
  const container = qs('#button-2-5')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.plan(4)

  t.ok(button, 'the component was constructed with a button')
  t.ok(component.hasAttribute('value'), 'the component has value')
  t.ok(button.hasAttribute('value'), 'the button has value')
  t.equal(button.getAttribute('value'), 'v', 'button has Correct value')

  t.end()
})

tape('{{button-3}} is disabled', t => {
  const container = qs('#button-3')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.plan(2)

  t.ok(button, 'the component was constructed with a button')
  t.ok(button.hasAttribute('disabled'), 'the button has the disabled attribute')

  t.end()
})

tape('{{button-4}} is not disabled when disabled="false"', t => {
  const container = qs('#button-4')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.plan(3)

  t.ok(button, 'the component was constructed with a button')
  t.equal(component.getAttribute('disabled'), 'false', 'component has the disabled="false" attribute')
  t.ok(!button.hasAttribute('disabled'), 'button does not have disabled class')

  t.end()
})

tape('{{button-5}} has correct attributes', t => {
  const container = qs('#button-5')
  const component = qs('tonic-button', container)
  const buttonWrapper = qs('.tonic--button--wrapper', component)
  const button = qs('button', component)

  t.plan(9)

  t.ok(button, 'the component was constructed with a button')
  t.equal(button.getAttribute('autofocus'), 'true', 'button has autofocus="true" attribute')
  t.equal(button.getAttribute('type'), 'reset', 'button has type="reset" attribute')
  t.ok(buttonWrapper.style.margin === '10px', 'button wrapper has margin="10px"')
  t.ok(button.style.width === '200px', 'button has width of 200px')
  t.ok(button.style.height === '50px', 'button has height of 50px')
  t.ok(button.style.borderRadius === '5px', 'button has border radius of 5px')
  t.equal(button.getAttribute('tabindex'), '1', 'tabindex is 1')
  t.equal(button.getAttribute('type'), button.textContent, 'button has text content equal to type')

  t.end()
})

tape('{{button-6}} gets style derived from component "fill" attribute', t => {
  const container = qs('#button-6')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.ok(button, 'the component was constructed with a button')
  t.ok(component.hasAttribute('fill'), 'the component has fill attribute')
  t.equal(component.getAttribute('fill'), button.style.backgroundColor, 'the fill attribute matches button background color')
  // Testing borderColor doesn't work in Safari, specific borderColor property isn't created
  // t.equal(component.getAttribute('fill'), button.style.borderColor, 'the fill attribute matches button border color')
  t.equal(window.getComputedStyle(button).borderColor, 'rgb(240, 102, 83)', 'the color was added')

  t.end()
})

tape('{{button-7}} gets border style derived from component attributes', t => {
  const container = qs('#button-7')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.ok(button, 'the component was constructed with a button')
  t.equal(component.getAttribute('border-width'), button.style.borderWidth, 'button contains style "border-width" matching component attribute "border-width"')
  t.equal(component.getAttribute('text-color'), button.style.color, 'button contains style "color" matching component attribute "text-color"')

  t.end()
})

tape('{{button-8}} is async, shows loading state when clicked', async t => {
  const container = qs('#button-8')
  const component = qs('tonic-button', container)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.getAttribute('async'), 'true', 'the button async attribute is true')

  component.addEventListener('click', async e => {
    const button = component.querySelector('button')

    await sleep(128)
    const isLoading = button.classList.contains('tonic--loading')
    t.ok(isLoading, 'loading class was applied')
    t.end()
  })

  component.dispatchEvent(new window.Event('click'))
})

tape('{{button-9}} is not async, does not show loading when clicked', async t => {
  const container = qs('#button-9')
  const component = qs('tonic-button', container)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.getAttribute('async'), 'false', 'the button async attribute is false')

  component.addEventListener('click', async e => {
    const button = component.querySelector('button')

    await sleep(128)
    const isLoading = button.classList.contains('tonic--loading')
    t.ok(!isLoading, 'loading class was not applied')

    t.end()
  })

  component.dispatchEvent(new window.Event('click'))
})

tape('{{button-10}} has tabindex attribute', t => {
  const container = qs('#button-10')
  const component = qs('tonic-button', container)
  const button = qs('button', component)

  t.plan(3)

  t.ok(button, 'the component was constructed with a button')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have a tabindex')
  t.equal(button.hasAttribute('tabindex'), true, 'button has a tabindex')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],37:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicChart extends Tonic {
  constructor (o) {
    super(o)

    try {
      const dynamicRequire = require
      this.Chart = dynamicRequire('chart.js')
    } catch (err) {
      console.error('could not find "chart.js" dependency. npm install?')
    }
  }

  static stylesheet () {
    return `
      tonic-chart {
        display: inline-block;
        position: relative;
      }

      tonic-chart canvas {
        display: inline-block;
        position: relative;
      }
    `
  }

  draw (data = {}, options = {}) {
    const root = this.querySelector('canvas')
    const type = this.props.type || options.type

    return new this.Chart(root, {
      type,
      options,
      data
    })
  }

  async fetch (url, opts = {}) {
    if (!url) return {}

    try {
      const res = await window.fetch(url, opts)
      return { data: await res.json() }
    } catch (err) {
      return { err }
    }
  }

  async connected () {
    let data = null

    const options = {
      ...this.props,
      ...this.props.options
    }

    const src = this.props.src

    if (typeof src === 'string') {
      const response = await this.fetch(src)

      if (response.err) {
        console.error(response.err)
        data = {}
      } else {
        data = response.data
      }
    }

    if (src === Object(src)) {
      data = src
    }

    if (data && data.chartData) {
      throw new Error('chartData propery deprecated')
    }

    if (data) {
      this.draw(data, options)
    }
  }

  render () {
    const {
      width,
      height
    } = this.props

    this.style.width = width
    this.style.height = height

    return this.html`
      <canvas ... ${{ width, height }}>
      </canvas>
    `
  }
}

module.exports = { TonicChart }

},{"@optoolco/tonic":49}],38:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="chart">
  <h2>Chart</h2>

  <div id="chart-1" class="test-container">
    <span>Default</span>
    <tonic-chart width=400px height=400px></tonic-chart>
  </div>
</section>
`)

tape('got a chart', t => {
  const container = qs('#chart-1')
  const chart = qs('#chart-1 tonic-chart')
  const canvas = qs('#chart-1 canvas')

  t.ok(container)
  t.ok(chart)
  t.ok(canvas)

  t.equal(canvas.width, 400)
  t.equal(canvas.height, 400)

  const styles = window.getComputedStyle(canvas)
  t.equal(styles.display, 'inline-block')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],39:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicCheckbox extends Tonic {
  get value () {
    const state = this.state
    let value

    if ('checked' in this.props) {
      value = this.props.checked
    } else {
      value = state.checked
    }

    return (value === true) || (value === 'true')
  }

  set value (value) {
    const checked = (value === true) || (value === 'true')

    this.state.checked = checked
    this.props.checked = checked
    this.reRender()
  }

  defaults () {
    return {
      disabled: false,
      size: '18px'
    }
  }

  static stylesheet () {
    return `
      tonic-checkbox .tonic--checkbox--wrapper {
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      tonic-checkbox input[type="checkbox"] {
        display: none;
      }

      tonic-checkbox input[type="checkbox"][disabled] + label {
        opacity: 0.35;
      }

      tonic-checkbox label {
        color: var(--tonic-primary, #333);
        font: 12px var(--tonic-subheader, 'Arial', sans-serif);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: inline;
        vertical-align: middle;
      }

      tonic-checkbox .tonic--icon {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-size: contain;
      }

      tonic-checkbox .tonic--icon svg {
        width: inherit;
        height: inherit;
      }

      tonic-checkbox label:nth-of-type(2) {
        padding-top: 2px;
        margin-left: 10px;
      }
    `
  }

  change (e) {
    if (
      this.props.virtual === true ||
      this.props.virtual === 'true'
    ) {
      return
    }
    if (this.state._changing) return

    e.stopPropagation()

    const currentState = this.value
    this.state._changing = true
    this.value = !currentState

    this.reRender()
  }

  updated () {
    if (this.state._changing) {
      const e = new window.Event('change', { bubbles: true })
      this.dispatchEvent(e)
      delete this.state._changing
    }
  }

  styles () {
    return {
      icon: {
        width: this.props.size,
        height: this.props.size
      }
    }
  }

  renderIcon () {
    const checked = this.value
    const iconState = checked ? 'checked' : 'unchecked'

    return this.html`
      <svg>
        <use ... ${{
          href: `#${iconState}`,
          'xlink:href': `#${iconState}`,
          color: 'var(--tonic-primary, #333)',
          fill: 'var(--tonic-primary, #333)'
        }}>
        </use>
      </svg>
    `
  }

  renderLabel () {
    let {
      id,
      label
    } = this.props

    if (!this.props.label) {
      label = this.nodes
    }

    return this.html`
      <label
        styles="label"
        for="tonic--checkbox--${id}"
      >${label}</label>
    `
  }

  render () {
    const {
      id,
      disabled,
      theme,
      title,
      tabindex
    } = this.props

    const checked = this.value
    if (typeof this.state.checked === 'undefined') {
      this.state.checked = checked
    }

    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <div class="tonic--checkbox--wrapper">
        <input ... ${{
          type: 'checkbox',
          id: `tonic--checkbox--${id}`,
          checked,
          disabled: disabled === 'true',
          title,
          tabindex
        }}/>
        <label
          for="tonic--checkbox--${id}"
          styles="icon"
          class="tonic--icon"
        >
          ${this.renderIcon()}
        </label>
        ${this.renderLabel()}
      </div>
    `
  }
}

module.exports = { TonicCheckbox }

},{"@optoolco/tonic":49}],40:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="checkbox">
  <tonic-sprite></tonic-sprite>
  <h2>Checkbox</h2>

  <div id="checkbox-1" class="test-container">
    <span>Default</span>
    <tonic-checkbox
      id="tonic-checkbox">
    </tonic-checkbox>
  </div>

  <div id="checkbox-2" class="test-container">
    <span>label="label"</span>
    <tonic-checkbox
      id="tonic-checkbox-label"
      label="Label">
    </tonic-checkbox>
  </div>

  <div id="checkbox-3" class="test-container">
    <span>checked="true"</span>
    <tonic-checkbox
      id="tonic-checkbox-checked"
      checked="true">
    </tonic-checkbox>
  </div>

  <div id="checkbox-4" class="test-container">
    <span>disabled="true"</span>
    <tonic-checkbox
      id="tonic-checkbox-disabled"
      disabled="true">
    </tonic-checkbox>
  </div>

  <div id="checkbox-5" class="test-container">
    <span>size="30px"</span>
    <tonic-checkbox
      id="tonic-checkbox-size"
      size="30px">
    </tonic-checkbox>
  </div>

  <div id="checkbox-6" class="test-container">
    <span>tabindex="0"</span>
    <tonic-checkbox
      tabindex="0"
      id="tonic-checkbox-tabindex">
    </tonic-checkbox>
  </div>

  <div id="checkbox-6-5" class="test-container">
    <span>title="foo"</span>
    <tonic-checkbox
      title="foo"
      id="tonic-checkbox-title">
    </tonic-checkbox>
  </div>

  <div id="checkbox-7" class="test-container">
    <span>child elements</span>
    <tonic-checkbox
      tabindex="0"
      id="tonic-checkbox-children">
      This is a <a href="https://google.com" target="blank">label</a>!
    </tonic-checkbox>
  </div>

  <!-- need to fix with new tonic-icon method -->

  <!-- <div id="checkbox-6" class="test-container">
    <span>Custom</span>
    <tonic-checkbox
      id="tonic-checkbox-custom"
      icon-on="./sprite.svg#custom_on"
      icon-off="./sprite.svg#custom_off">
    </tonic-checkbox>
  </div>

  <div id="checkbox-7" class="test-container">
    <span>Custom, checked</span>
    <tonic-checkbox
      id="tonic-checkbox-custom-2"
      checked="true"
      icon-on="./sprite.svg#custom_on"
      icon-off="./sprite.svg#custom_off">
    </tonic-checkbox>
  </div> -->

</section>
`)

tape('{{checkbox-1}} has correct default state', t => {
  const container = qs('#checkbox-1')
  const component = qs('tonic-checkbox', container)
  const wrapper = qs('.tonic--checkbox--wrapper', component)
  const input = qs('input[type="checkbox"]', component)
  const icon = qs('.tonic--icon', component)

  const label = qs('tonic-checkbox label', container)
  t.ok(label)

  const styles = window.getComputedStyle(label)
  t.equal(styles.color, 'rgb(51, 51, 51)')

  t.ok(wrapper, 'component constructed with a wrapper')
  t.ok(input, 'component constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(icon, 'component constructed with default icon')
  t.ok(input.checked === false, 'the default checkbox is not checked')

  t.end()
})

tape('{{checkbox-2}} has correct label', t => {
  const container = qs('#checkbox-2')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)
  const label = qs('label:not(.tonic--icon)', component)

  t.plan(3)

  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(label, 'component was constructed with a label')
  t.equal(component.getAttribute('label'), label.textContent, 'the label attribute matches the label text')

  t.end()
})

tape('{{checkbox-3}} is checked', t => {
  const container = qs('#checkbox-3')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(3)

  t.ok(input, 'component was constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(input.checked, 'the input is checked')

  t.end()
})

tape('{{checkbox-4}} is disabled', t => {
  const container = qs('#checkbox-4')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(3)

  t.ok(input, 'component was constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(input.hasAttribute('disabled'), 'the input is disabled')

  t.end()
})

tape('{{checkbox-5}} has size attributes', t => {
  const container = qs('#checkbox-5')
  const component = qs('tonic-checkbox', container)
  const icon = qs('label.tonic--icon', component)
  const input = qs('input[type="checkbox"]', component)
  const size = component.getAttribute('size')

  t.plan(5)

  t.ok(input, 'component was constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.ok(component.hasAttribute('size'), 'the component has a size attribute')
  t.ok(icon.style.width === size, 'the width equals the size attribute')
  t.ok(icon.style.height === size, 'the height equals the size attribute')

  t.end()
})

tape('{{checkbox-6}} has Tabindex', t => {
  const container = qs('#checkbox-6')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(4)

  t.ok(input, 'component was constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have a tabindex')
  t.equal(input.hasAttribute('tabindex'), true, 'input has a tabindex')

  t.end()
})

tape('{{checkbox-6-5}} has title', t => {
  const container = qs('#checkbox-6-5')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(5)

  t.ok(input, 'component was constructed with an input')
  t.ok(input.hasAttribute('id'), 'input was constructed with an id')
  t.equal(component.hasAttribute('title'), true, 'component has title')
  t.equal(input.hasAttribute('title'), true, 'input has title')
  t.equal(input.getAttribute('title'), 'foo')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],41:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class Dialog extends Tonic {
  constructor () {
    super()

    this.addEventListener('click', e => {
      const el = Tonic.match(e.target, '.tonic--dialog-close')
      if (el) this.hide()

      const overlay = e.target.matches('.tonic--dialog-overlay')
      if (overlay) this.hide()
    })
  }

  defaults () {
    return {
      width: '450px',
      height: 'auto',
      overlay: true,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  static stylesheet () {
    return `
      .tonic--dialog .tonic--dialog--wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        z-index: 100;
        visibility: hidden;
        transition: visibility 0s ease 0.5s;
      }

      .tonic--dialog .tonic--dialog--wrapper.tonic--show {
        visibility: visible;
        transition: visibility 0s ease 0s;
      }

      .tonic--dialog .tonic--dialog--wrapper.tonic--show .tonic--overlay {
        opacity: 1;
      }

      .tonic--dialog .tonic--dialog--wrapper.tonic--show .tonic--dialog--content {
        color: var(--tonic-primary, #333);
        opacity: 1;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
      }

      .tonic--dialog .tonic--overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }

      .tonic--dialog .tonic--dialog--content {
        min-width: 350px;
        min-height: 250px;
        height: auto;
        width: auto;
        margin: auto;
        position: relative;
        background-color: var(--tonic-window, #fff);
        z-index: 1;
        opacity: 0;
        -webkit-transform: scale(0.8);
        -ms-transform: scale(0.8);
        transform: scale(0.8);
        transition: all 0.3s ease-in-out;
      }

      .tonic--dialog .tonic--dialog--content > .tonic--close {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 25px;
        right: 25px;
        cursor: pointer;
      }

      .tonic--dialog .tonic--close svg {
        width: inherit;
        height: inherit;
      }
    `
  }

  show () {
    const that = this

    return new Promise((resolve) => {
      const node = this.querySelector('.tonic--dialog--wrapper')
      node.classList.add('tonic--show')
      node.addEventListener('transitionend', resolve, { once: true })

      this._escapeHandler = e => {
        if (e.keyCode === 27) that.hide()
      }

      document.addEventListener('keyup', that._escapeHandler)
    })
  }

  hide () {
    const that = this

    return new Promise((resolve) => {
      const node = this.querySelector('.tonic--dialog--wrapper')
      node.classList.remove('tonic--show')
      node.addEventListener('transitionend', resolve, { once: true })
      document.removeEventListener('keyup', that._escapeHandler)
    })
  }

  event (eventName) {
    const that = this

    return {
      then (resolve) {
        const listener = event => {
          const close = Tonic.match(event.target, '.tonic--dialog-close')
          const value = Tonic.match(event.target, '[value]')

          if (close || value) {
            that.removeEventListener(eventName, listener)
          }

          if (close) return resolve({})
          if (value) resolve({ [event.target.value]: true })
        }

        that.addEventListener(eventName, listener)
      }
    }
  }

  async * wrap () {
    const {
      width,
      height,
      overlay,
      theme,
      color,
      backgroundColor
    } = this.props

    this.classList.add('tonic--dialog')

    const wrapper = document.createElement('div')

    const isOpen = !!this.querySelector('.tonic--dialog--wrapper.tonic--show')
    wrapper.className = isOpen ? 'tonic--dialog--wrapper tonic--show' : 'tonic--dialog--wrapper'

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    if (overlay !== 'false') {
      const overlayElement = document.createElement('div')
      overlayElement.className = 'tonic--overlay tonic--dialog-overlay'
      overlayElement.style.backgroundColor = backgroundColor
      wrapper.appendChild(overlayElement)
    }

    const dialog = document.createElement('div')
    dialog.className = 'tonic--dialog--content'
    if (width) dialog.style.width = width
    if (height) dialog.style.height = height

    // create template
    const closeIcon = document.createElement('div')
    closeIcon.className = 'tonic--close tonic--dialog-close'

    // create SVG
    const svgns = 'http://www.w3.org/2000/svg'
    const xlinkns = 'http://www.w3.org/1999/xlink'
    const svg = document.createElementNS(svgns, 'svg')
    const use = document.createElementNS(svgns, 'use')

    closeIcon.appendChild(svg)
    svg.appendChild(use)

    const iconColor = color || 'var(--tonic-primary, #333)'

    use.setAttributeNS(xlinkns, 'href', '#close')
    use.setAttributeNS(xlinkns, 'xlink:href', '#close')
    use.setAttribute('color', iconColor)
    use.setAttribute('fill', iconColor)

    wrapper.appendChild(dialog)
    const contentContainer = document.createElement('div')
    contentContainer.className = 'tonic--dialog--content-container'
    dialog.appendChild(contentContainer)
    dialog.appendChild(closeIcon)

    yield wrapper

    const setContent = content => {
      if (!content) return

      if (typeof content === 'string') {
        contentContainer.innerHTML = content
      } else if (content.isTonicRaw) {
        contentContainer.innerHTML = content.rawText
      } else {
        [...content.childNodes].forEach(el => contentContainer.appendChild(el))
      }
    }

    if (this.wrapped instanceof Tonic.AsyncFunction) {
      setContent(await this.wrapped() || '')
      return wrapper
    } else if (this.wrapped instanceof Tonic.AsyncFunctionGenerator) {
      const itr = this.wrapped()
      while (true) {
        const { value, done } = await itr.next()
        setContent(value)

        if (done) {
          return wrapper
        }

        yield wrapper
      }
    } else if (this.wrapped instanceof Function) {
      setContent(this.wrapped() || '')
      return wrapper
    }

    return wrapper
  }
}

module.exports = { Dialog }

},{"@optoolco/tonic":49}],42:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

const { Dialog } = require('./index')

const sleep = n => new Promise(resolve => setTimeout(resolve, n))

class ExampleDialog extends Dialog {
  async click (e) {
    return Tonic.match(e.target, 'tonic-button')
  }

  render () {
    return `
      <header>Dialog</header>
      <main>
        ${this.props.message || 'Ready'}
      </main>
      <footer>
        <tonic-button class="tonic--close" id="close">Close</tonic-button>
      </footer>
    `
  }
}

Tonic.add(ExampleDialog)

document.body.appendChild(html`
<section id="dialog">
  <h2>Dialog</h2>

  <div id="dialog-1" class="test-container">
    <span>Default Dialog</span>
    <tonic-button id="dialog-default-button">Open</tonic-button>
    <example-dialog message="Hello!" id="dialog-default"></example-dialog>
  </div>

  <!-- <div class="test-container">
    <span>width="150px"</span>
    <tonic-button id="dialog-width-button">Open</tonic-button>
    <example-dialog message="width: 150px" width="150px" id="dialog-width"></example-dialog>
  </div>

  <div class="test-container">
    <span>width="100%"</span>
    <tonic-button id="dialog-full-width-button">Open</tonic-button>
    <example-dialog message="width: 100%" width="100%" id="dialog-full-width"></example-dialog>
  </div>

  <div class="test-container">
    <span>height="700px"</span>
    <tonic-button id="dialog-height-button">Open</tonic-button>
    <example-dialog message="height: 700px" height="700px" id="dialog-height"></example-dialog>
  </div>

  <div class="test-container">
    <span>height="100%"</span>
    <tonic-button id="dialog-full-height-button">Open</tonic-button>
    <example-dialog message="height: 100%" height="100%" id="dialog-full-height"></example-dialog>
  </div>

  <div class="test-container">
    <span>overlay="true"</span>
    <tonic-button id="dialog-overlay-button">Open</tonic-button>
    <example-dialog message="overlay: true" overlay="true" id="dialog-overlay"></example-dialog>
  </div>

  <div class="test-container">
    <span>overlay="false"</span>
    <tonic-button id="dialog-no-overlay-button">Open</tonic-button>
    <example-dialog message="overlay: false" overlay="false" id="dialog-no-overlay"></example-dialog>
  </div>

  <div class="test-container">
    <span>background-color="red"</span>
    <tonic-button id="dialog-background-button">Open</tonic-button>
    <example-dialog message="background-color: red" background-color="red" id="dialog-background"></example-dialog>
  </div> -->

</section>
`)

//
// Dialog Tests
//
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

tape('{{dialog-1}} is constructed properly, opens and closes properly', async t => {
  const container = qs('#dialog-1')
  const component = qs('example-dialog', container)
  const wrapper = qs('.tonic--dialog--wrapper', component)
  const close = qs('.tonic--close', component)
  const isShowingInitialState = wrapper.classList.contains('tonic--show')

  t.plan(7)

  t.equal(isShowingInitialState, false, 'the element has no show class')
  t.ok(wrapper, 'the component contains the wrapper')
  t.ok(close, 'the component contains the close button')
  t.ok(component.hasAttribute('id'), 'the component has an id')

  const styles = window.getComputedStyle(wrapper)
  t.equal(styles.position, 'fixed')

  await component.show()

  const isShowingAfterOpen = wrapper.classList.contains('tonic--show')
  t.equal(isShowingAfterOpen, true, 'the element has been opened, has show class')

  await sleep(128)
  await component.hide()

  const isShowing = wrapper.classList.contains('tonic--show')
  t.equal(isShowing, false, 'the element has been closed, has no show class')

  t.end()
})

},{"..":46,"../test/util":112,"./index":41,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],43:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicForm extends Tonic {
  static isNumber (s) {
    return !isNaN(Number(s))
  }

  static getPropertyValue (o, path) {
    if (!path) return null

    const parts = path.split('.')
    let value = o

    for (const p of parts) {
      if (!value) return null
      value = value[p]
    }

    return value
  }

  static setPropertyValue (o, path, v) {
    if (!path) return

    const parts = path.split('.')
    let value = o

    const last = parts.pop()
    if (!last) return

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]
      const next = parts[i + 1] || last

      if (!value[p]) {
        value[p] = TonicForm.isNumber(next) ? [] : {}
      }

      value = value[p]
    }

    value[last] = v
    return o
  }

  setData (data) {
    this.value = data
  }

  getData () {
    return this.value
  }

  getElements () {
    return [...this.querySelectorAll('[data-key]')]
  }

  get value () {
    const elements = this.getElements()
    const data = {}

    for (const element of elements) {
      TonicForm.setPropertyValue(data, element.dataset.key, element.value)
    }

    return data
  }

  set value (data) {
    if (typeof data !== 'object') return

    const elements = this.getElements()

    for (const element of elements) {
      const value = TonicForm.getPropertyValue(data, element.dataset.key)
      if (!value) continue

      element.value = value
    }
  }

  render () {
    return this.html`
      ${this.childNodes}
    `
  }
}

module.exports = { TonicForm }

},{"@optoolco/tonic":49}],44:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicIcon extends Tonic {
  defaults () {
    return {
      size: '25px',
      fill: 'var(--tonic-primary, #333)'
    }
  }

  static stylesheet () {
    return `
      tonic-icon svg path {
        fill: inherit;
      }
    `
  }

  styles () {
    const {
      size
    } = this.props

    return {
      icon: {
        width: size,
        height: size
      }
    }
  }

  render () {
    const {
      symbolId,
      size,
      fill,
      theme,
      src,
      tabindex
    } = this.props

    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <svg ... ${{
        styles: 'icon',
        tabindex
      }}>
        <use ... ${{
          href: `${src || ''}#${symbolId}`,
          'xlink:href': `${src || ''}#${symbolId}`,
          width: size,
          fill,
          color: fill,
          height: size
        }}>
      </svg>
    `
  }
}

module.exports = { TonicIcon }

},{"@optoolco/tonic":49}],45:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="icon">
  <h2>Icon</h2>

  <div id="icon-1" class="test-container">
    <span>Default Icon</span>
    <tonic-icon
      tabindex="0"
      symbol-id="example"
      src="/sprite.svg">
    </tonic-icon>
  </div>

  <div id="icon-2" class="test-container">
    <span>size="40px"</span>
    <tonic-icon
      symbol-id="example"
      src="/sprite.svg"
      size="40px">
    </tonic-icon>
  </div>

  <div id="icon-3" class="test-container">
    <span>fill="cyan"</span>
    <tonic-icon
      symbol-id="example"
      src="/sprite.svg"
      fill="cyan">
    </tonic-icon>
  </div>

  <div id="icon-4" class="test-container">
    <span>symbol-id="custom_off"</span>
    <tonic-icon
      symbol-id="custom_off"
      src="/sprite.svg">
    </tonic-icon>
  </div>

  <div id="icon-5" class="test-container">
    <span>tabindex="0"</span>
    <tonic-icon
      tabindex="0"
      symbol-id="example"
      src="/sprite.svg">
    </tonic-icon>
  </div>

</section>
`)

tape('{{icon-1}} is constructed properly', t => {
  const container = qs('#icon-1')
  const component = qs('tonic-icon', container)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('src'), 'the component has a src')
  t.ok(component.hasAttribute('symbol-id'), 'the component has a symbol id')

  t.end()
})

tape('{{icon-2}} has size attribute', t => {
  const container = qs('#icon-2')
  const component = qs('tonic-icon', container)
  const svg = qs('svg', component)
  const use = qs('use', component)

  t.plan(6)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('size'), 'the component has the size attribute')
  t.equal(component.getAttribute('size'), svg.style.width, 'the size attribute matches svg width')
  t.equal(component.getAttribute('size'), svg.style.height, 'the size attribute matches svg height')

  t.equal(use.getAttribute('width'), component.getAttribute('size'))
  t.equal(use.getAttribute('height'), component.getAttribute('size'))

  t.end()
})

tape('{{icon-3}} has color attribute', t => {
  const container = qs('#icon-3')
  const component = qs('tonic-icon', container)
  const use = qs('use', component)

  t.plan(3)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.getAttribute('fill'), use.getAttribute('fill'), 'the fill attribute on the component matches use')
  t.equal(use.getAttribute('fill'), use.getAttribute('color'), 'use has matching fill and color attributes')

  t.end()
})

tape('{{icon-4}} uses custom symbol', t => {
  const container = qs('#icon-4')
  const component = qs('tonic-icon', container)
  const svg = qs('svg', component)
  const id = component.getAttribute('symbol-id')
  const src = component.getAttribute('src')
  const use = qs('use', component)
  const url = `${src}#${id}`

  t.plan(5)

  t.ok(svg, 'the component was constructed with an svg')
  t.ok(id, 'the component has symbol id')
  t.ok(src, 'the component has src')
  t.equal(use.getAttribute('href'), url, 'the href attribute contains the correct url')
  t.equal(use.getAttribute('xlink:href'), url)

  t.end()
})

tape('{{icon-5}} has tabindex attribute', t => {
  const container = qs('#icon-5')
  const component = qs('tonic-icon', container)
  const id = component.getAttribute('symbol-id')
  const svg = qs('svg', component)

  t.plan(4)

  t.ok(svg, 'the component was constructed with an svg')
  t.ok(id, 'the component has symbol id')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have tabindex attribute')
  t.equal(svg.hasAttribute('tabindex'), true, 'svg has tabindex attribute')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],46:[function(require,module,exports){
let Tonic
try {
  Tonic = require('@optoolco/tonic')
} catch (err) {
  console.error('Missing dependency. Try `npm install @optoolco/tonic`.')
  throw err
}

const version = Tonic.version
const major = version ? version.split('.')[0] : '0'
if (parseInt(major, 10) < 12) {
  console.error('Out of data dependency. Try `npm install @optoolco/tonic@12`.')
  throw new Error('Invalid Tonic version. requires at least v12')
}

const { TonicAccordion, TonicAccordionSection } = require('./accordion')
const { TonicBadge } = require('./badge')
const { TonicButton } = require('./button')
const { TonicChart } = require('./chart')
const { TonicCheckbox } = require('./checkbox')
const { TonicForm } = require('./form')
const { TonicIcon } = require('./icon')
const { TonicInput } = require('./input')
const { TonicPopover } = require('./popover')
const { TonicProfileImage } = require('./profile-image')
const { TonicProgressBar } = require('./progress-bar')
const { TonicRange } = require('./range')
const { TonicRelativeTime } = require('./relative-time')
const { TonicRouter } = require('./router')
const { TonicSelect } = require('./select')
const { TonicSprite } = require('./sprite')
const { TonicTabs, TonicTab, TonicTabPanel } = require('./tabs')
const { TonicTextarea } = require('./textarea')
const { TonicTooltip } = require('./tooltip')
const { TonicToasterInline } = require('./toaster-inline')
const { TonicToaster } = require('./toaster')
const { TonicToggle } = require('./toggle')

//
// An example collection of components.
//
module.exports = components
// For supporting unpkg / dist / jsfiddle.
components.Tonic = Tonic

function components (Tonic, opts) {
  Tonic.add(TonicAccordion)
  Tonic.add(TonicAccordionSection)
  Tonic.add(TonicBadge)
  Tonic.add(TonicButton)
  Tonic.add(TonicChart)
  Tonic.add(TonicCheckbox)
  Tonic.add(TonicForm)
  Tonic.add(TonicInput)
  Tonic.add(TonicIcon)
  Tonic.add(TonicPopover)
  Tonic.add(TonicProfileImage)
  Tonic.add(TonicProgressBar)
  Tonic.add(TonicRange)
  Tonic.add(TonicRelativeTime)
  Tonic.add(TonicRouter)
  Tonic.add(TonicSelect)
  Tonic.add(TonicSprite)
  Tonic.add(TonicTabs)
  Tonic.add(TonicTab)
  Tonic.add(TonicTabPanel)
  Tonic.add(TonicTextarea)
  Tonic.add(TonicTooltip)
  Tonic.add(TonicToasterInline)
  Tonic.add(TonicToaster)
  Tonic.add(TonicToggle)
}

},{"./accordion":32,"./badge":33,"./button":35,"./chart":37,"./checkbox":39,"./form":43,"./icon":44,"./input":47,"./popover":94,"./profile-image":96,"./progress-bar":98,"./range":100,"./relative-time":102,"./router":103,"./select":105,"./sprite":107,"./tabs":108,"./textarea":113,"./toaster":117,"./toaster-inline":115,"./toggle":119,"./tooltip":121,"@optoolco/tonic":49}],47:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicInput extends Tonic {
  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      color: 'var(--tonic-primary)',
      spellcheck: false,
      ariaInvalid: false,
      invalid: false,
      radius: '3px',
      disabled: false,
      position: 'left'
    }
  }

  get form () {
    return this.querySelector('input').form
  }

  get value () {
    return this.state.value || this.props.value
  }

  set value (value) {
    this.querySelector('input').value = value
    this.state.value = value
  }

  setValid () {
    this.reRender(props => Object.assign({}, props, {
      invalid: false
    }))
  }

  setInvalid (msg) {
    this.reRender(props => Object.assign({}, props, {
      invalid: true,
      errorMessage: msg
    }))
  }

  static stylesheet () {
    return `
      tonic-input .tonic--wrapper {
        position: relative;
      }

      tonic-input[src] .tonic--right tonic-icon {
        right: 10px;
      }

      tonic-input[src] .tonic--right input {
        padding-right: 40px;
      }

      tonic-input[src] .tonic--left tonic-icon {
        left: 10px;
      }

      tonic-input[src] .tonic--left input {
        padding-left: 40px;
      }

      tonic-input[src] tonic-icon {
        position: absolute;
        bottom: 7px;
      }

      tonic-input label {
        color: var(--tonic-medium, #999);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader, 'Arial', sans-serif);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      tonic-input input {
        color: var(--tonic-primary, #333);
        font: 14px var(--tonic-monospace, 'Andale Mono', monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--tonic-border, #ccc);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-input input:invalid {
        border-color: var(--tonic-error, #f66);
      }

      tonic-input input:invalid:focus {
        border-color: var(--tonic-error, #f66);
      }

      tonic-input input:invalid ~ .tonic--invalid {
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 1s ease 0s;
      }

      tonic-input input:focus {
        border-color: var(--tonic-primary, #333);
      }

      tonic-input input[disabled] {
        background-color: var(--tonic-background, #fff);
      }

      tonic-input[label] .tonic--invalid {
        margin-bottom: -13px;
      }

      tonic-input .tonic--invalid {
        font-size: 14px;
        text-align: center;
        margin-bottom: 13px;
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        transform: translateY(-10px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s ease 1s;
        visibility: hidden;
        opacity: 0;
      }

      tonic-input .tonic--invalid span {
        color: white;
        padding: 2px 6px;
        background-color: var(--tonic-error, #f66);
        border-radius: 2px;
        position: relative;
        display: inline-block;
        margin: 0 auto;
      }

      tonic-input .tonic--invalid span:after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid var(--tonic-error, #f66);
      }
    `
  }

  renderLabel () {
    if (!this.props.label) return ''
    return this.html`
      <label
        for="tonic--input_${this.props.id}"
      >${Tonic.raw(this.props.label)}</label>
    `
  }

  renderIcon () {
    if (!this.props.src) return ''

    return this.html`
      <tonic-icon
        src="${this.props.src}"
        color="${this.props.color}">
      </tonic-icon>
    `
  }

  setupEvents () {
    const input = this.querySelector('input')

    const relay = name => {
      this.dispatchEvent(new window.CustomEvent(name, { bubbles: true }))
    }

    input.addEventListener('focus', e => {
      this.state.focus = true
      relay('focus')
    })

    input.addEventListener('blur', e => {
      this.state.focus = false
      relay('blur')
    })

    input.addEventListener('input', e => {
      this.state.value = e.target.value
      this.state.pos = e.target.selectionStart
    })

    const state = this.state
    if (!state.focus) return

    input.focus()

    try {
      input.setSelectionRange(state.pos, state.pos)
    } catch (err) {
      console.warn(err)
    }
  }

  updated () {
    const input = this.querySelector('input')

    setTimeout(() => {
      if (this.props.invalid) {
        input.setCustomValidity(this.props.errorMessage)
      } else {
        input.setCustomValidity('')
      }
    }, 32)

    this.setupEvents()
  }

  connected () {
    this.updated()
  }

  styles () {
    const {
      width,
      height,
      radius,
      padding
    } = this.props

    return {
      wrapper: {
        width
      },
      input: {
        width: '100%',
        height,
        borderRadius: radius,
        padding
      }
    }
  }

  render () {
    const {
      ariaInvalid,
      ariaLabelledby,
      disabled,
      height,
      label,
      max,
      maxlength,
      min,
      minlength,
      name,
      pattern,
      placeholder,
      position,
      readonly,
      required,
      spellcheck,
      tabindex,
      theme,
      title,
      type
    } = this.props

    if (ariaLabelledby) this.removeAttribute('ariaLabelledby')
    if (height) this.style.width = height
    if (name) this.removeAttribute('name')
    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const value = typeof this.state.value === 'string'
      ? this.state.value : this.props.value

    const errorMessage = this.props.errorMessage ||
      this.props.errormessage || 'Invalid'

    const classes = ['tonic--wrapper']
    if (position) classes.push(`tonic--${position}`)

    const attributes = {
      ariaInvalid,
      ariaLabel: label,
      'aria-labelledby': ariaLabelledby,
      disabled: disabled === 'true',
      max,
      maxlength,
      min,
      minlength,
      name,
      pattern,
      placeholder,
      position,
      readonly: readonly === 'true',
      required: required === 'true',
      spellcheck,
      tabindex,
      title,
      value
    }

    return this.html`
      <div class="${classes.join(' ')}" styles="wrapper">
        ${this.renderLabel()}
        ${this.renderIcon()}

        <input ... ${{
          styles: 'input',
          type,
          id: `tonic--input_${this.props.id}`,
          ...attributes
        }}/>
        <div class="tonic--invalid">
          <span id="tonic--error-${this.props.id}">${errorMessage}</span>
        </div>
      </div>
    `
  }
}

module.exports = { TonicInput }

},{"@optoolco/tonic":49}],48:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
const Tonic = require('@optoolco/tonic')
components(Tonic)

const requestAnimationFrame = window.requestAnimationFrame

class InputWrapper extends Tonic {
  constructor (o) {
    super(o)

    this.state = {
      copyValue: '',
      currentValue: '',
      inputEvents: 0,
      ...this.state
    }
  }

  input () {
    console.log('input ev')
    this.state.inputEvents++

    const input = this.querySelector('tonic-input')
    this.state.currentValue = input.value
  }

  click (ev) {
    console.log('click ev')
    const el = Tonic.match(ev.target, '[data-event]')
    if (!el || el.dataset.event !== 'copy') return

    this.state.copyValue = this.state.currentValue
    this.reRender()
  }

  render () {
    console.log('render()', JSON.stringify(this.state))
    return this.html`
      <div>
        <tonic-input id='tonic-input-wrapped'>
        </tonic-input>
        <tonic-button data-event='copy'>Copy</tonic-button>
        <span class='display'>${this.state.copyValue}</span>
      </div>
    `
  }
}
Tonic.add(InputWrapper, 'input-test-wrapper-comp')

document.body.appendChild(html`
<section id="input">
  <h2>Input</h2>

  <div class="test-container">
    <span>Default Input</span>
    <tonic-input id="input-1">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>value="I'm a value"</span>
    <tonic-input
      id="input-2"
      value="I'm a value">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>type="email"</span>
    <tonic-input
      id="input-3"
      type="email">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>required="true"</span>
    <tonic-input
      id="input-4"
      required="true">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>disabled="true"</span>
    <tonic-input
     id="input-5"
     disabled="true">
   </tonic-input>
  </div>

  <div class="test-container">
    <span>spellcheck="false"</span>
    <tonic-input
      id="input-6"
      spellcheck="false">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>error-message="nope"</span>
    <tonic-input
      id="input-7"
      value="test"
      type="email"
      error-message="nope">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>placeholder="test"</span>
    <tonic-input
      id="input-8"
      placeholder="test">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>label="Label"</span>
    <tonic-input
      id="input-9"
      label="Label">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>tabindex="0"</span>
    <tonic-input
      id="input-10"
      tabindex="0">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>readonly="true"</span>
    <tonic-input
      id="input-11"
      readonly="true">
    </tonic-input>
  </div>

  <div class="test-container">
    <span>Test Wrapper Comp</span>
    <input-test-wrapper-comp id="wrap"></input-test-wrapper-comp>
  </div>

  <!-- <div class="test-container">
    <span>src="somePath"</span>
    <tonic-input src="./sprite.svg#custom_off"></tonic-input>
  </div> -->

  <!-- <div class="test-container">
    <span>position="left"</span>
    <tonic-input position="left" src="./sprite.svg#custom_off"></tonic-input>
  </div> -->

  <!-- <div class="test-container">
    <span>position="right"</span>
    <tonic-input position="right" src="./sprite.svg#custom_off"></tonic-input>
  </div> -->

  <!-- <div class="test-container">
    <span>pattern="[A-Za-z\s]+"</span>
    <tonic-input pattern="[A-Za-z\s]+"></tonic-input>
  </div> -->


  <!-- <div id="input-11" class="test-container">
    <span>minlength="5"</span>
    <tonic-input minlength="5"></tonic-input>
  </div>

  <div class="test-container">
    <span>maxlength="10"</span>
    <tonic-input maxlength="10"></tonic-input>
  </div>

  <div class="test-container">
    <span>type="number", min="5"</span>
    <tonic-input type="number" min="5"></tonic-input>
  </div>

  <div class="test-container">
    <span>type="number", max="10"</span>
    <tonic-input type="number" max="10"></tonic-input>
  </div>

  <div class="test-container">
    <span>width="60px"</span>
    <tonic-input width="60px"></tonic-input>
  </div>

  <div class="test-container">
    <span>width="100%"</span>
    <tonic-input width="100%"></tonic-input>
  </div>

  <div class="test-container">
    <span>radius="8px"</span>
    <tonic-input radius="8px"></tonic-input>
  </div> -->

</section>
`)

tape('{{input-1}} default state is constructed', t => {
  const component = qs('tonic-input#input-1')
  const wrapper = qs('.tonic--wrapper', component)
  const input = qs('input', wrapper)
  const invalid = qs('.tonic--invalid', wrapper)

  t.plan(4)

  t.ok(wrapper, 'the component was constructed, has a wrapper')
  t.ok(input, 'the component contains an input')
  t.ok(invalid, 'the component contains a tonic invalid div')
  t.ok(!input.hasAttribute('disabled'), 'the input is not disabled by default')

  t.end()
})

tape('{{input-2}} contains a default value', t => {
  const component = qs('tonic-input#input-2')
  const input = qs('input', component)
  const value = component.getAttribute('value')

  t.plan(2)

  t.equal(value, input.getAttribute('value'), 'component input value attributes match')
  t.equal(value, input.value, 'component value attribute matches input value')

  t.end()
})

tape('{{input-3}} contains a type', t => {
  const component = qs('tonic-input#input-3')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.ok(component.hasAttribute('type'), 'component input value attributes match')
  t.equal(component.getAttribute('type'), input.type, 'component type matches input type')

  t.end()
})

tape('{{input-4}} is required', t => {
  const component = qs('tonic-input#input-4')
  const input = qs('input', component)

  t.plan(4)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.getAttribute('required'), 'true', 'component contains required attribute')
  t.equal(input.required, true, 'input is required')

  const styles = window.getComputedStyle(input)
  t.equal(styles.borderColor, 'rgb(255, 102, 102)')

  t.end()
})

tape('{{input-5}} is disabled', t => {
  const component = qs('tonic-input#input-5')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.getAttribute('disabled'), 'true', 'component contains disabled="true" attribute')
  t.ok(input.hasAttribute('disabled'), 'input has disabled attribute')

  t.end()
})

tape('{{input-6}} has spellcheck attribute', t => {
  const component = qs('tonic-input#input-6')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.ok(component.hasAttribute('spellcheck'), 'component contains spellcheck attribute')
  t.equal(component.getAttribute('spellcheck'), input.getAttribute('spellcheck'), 'component spellcheck attr matches input')

  t.end()
})

tape('{{input-7}} shows error message', t => {
  const component = qs('tonic-input#input-7')
  const input = qs('input', component)
  const error = qs('.tonic--invalid', component)
  const errorMessage = qs('span', error)

  t.plan(4)

  t.ok(input, 'the component was constructed with an input')
  t.ok(error, 'the component was constructed with an error')
  t.equal(component.getAttribute('error-message'), errorMessage.textContent, 'attribute matches error text')
  t.ok(qs('input:invalid', component), 'input is invalid, error is showing')

  t.end()
})

tape('{{input-8}} has placeholder', t => {
  const component = qs('tonic-input#input-8')
  const input = qs('input', component)

  t.plan(2)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.getAttribute('placeholder'), input.getAttribute('placeholder'), 'component and input placeholder attributes match')

  t.end()
})

tape('{{input-9}} has label', t => {
  const component = qs('tonic-input#input-9')
  const input = qs('input', component)
  const label = qs('label:not(.tonic--icon)', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.ok(label, 'the component was constructed with a label')
  t.equal(component.getAttribute('label'), label.textContent, 'component label attribute matches text of label')

  t.end()
})

tape('{{input-10}} has tabindex', t => {
  const component = qs('tonic-input#input-10')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have a tabindex')
  t.equal(input.hasAttribute('tabindex'), true, 'input has a tabindex')

  t.end()
})

tape('{{input-11}} has readonly attribute', t => {
  const component = qs('tonic-input#input-11')
  const input = qs('input', component)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.hasAttribute('readonly'), true, 'component has a readonly="true" attribute')
  t.ok(input.hasAttribute('readonly'), 'input has a readonly attribute')

  t.end()
})

tape('{{input-1}} event handlers', t => {
  const component = qs('tonic-input#input-1')
  const input = qs('input', component)

  let counter = 0

  component.addEventListener('input', (ev) => {
    t.equal(++counter, 1)
    t.equal(ev.currentTarget.value, 'someText')

    t.end()
  })

  input.value = 'someText'
  input.dispatchEvent(new window.Event('input', {
    bubbles: true
  }))
})

tape('input wrapper component interactions', t => {
  const comp = qs('input-test-wrapper-comp')

  let display = comp.querySelector('span.display')
  t.equal(display.textContent, '')

  const rawInputs = comp.querySelectorAll('input')
  t.equal(rawInputs.length, 1)

  const input = rawInputs[0]
  input.value = 'someText'
  input.dispatchEvent(new window.Event('input', {
    bubbles: true
  }))

  const buttons = comp.querySelectorAll('button')
  t.equal(buttons.length, 1)

  buttons[0].click()

  requestAnimationFrame(() => {
    display = comp.querySelector('span.display')
    t.equal(display.textContent, 'someText')
    t.equal(comp.state.inputEvents, 1)

    t.end()
  })
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],49:[function(require,module,exports){
class TonicRaw {
  constructor (rawText, templateStrings) {
    this.isTonicRaw = true
    this.rawText = rawText
    this.templateStrings = templateStrings
  }

  valueOf () { return this.rawText }
  toString () { return this.rawText }
}

class Tonic extends window.HTMLElement {
  constructor () {
    super()
    const state = Tonic._states[super.id]
    delete Tonic._states[super.id]
    this._state = state || {}
    this.props = {}
    this.elements = [...this.children]
    this.elements.__children__ = true
    this.nodes = [...this.childNodes]
    this.nodes.__children__ = true
    this._events()
  }

  static _createId () {
    return `tonic${Tonic._index++}`
  }

  static _maybePromise (p) {
    if (p && typeof p.then === 'function' && typeof p.catch === 'function') {
      p.catch(err => setTimeout(() => { throw err }, 0))
    }
  }

  static _splitName (s) {
    return s.match(/[A-Z][a-z]*/g).join('-')
  }

  static _normalizeAttrs (o, x = {}) {
    [...o].forEach(o => (x[o.name] = o.value))
    return x
  }

  _checkId () {
    const _id = super.id
    if (!_id) throw new Error(`Component: ${this.tagName} has no id`)
    return _id
  }

  get state () {
    return (this._checkId(), this._state)
  }

  set state (newState) {
    this._state = (this._checkId(), newState)
  }

  get id () { return this._checkId() }

  set id (newId) { super.id = newId }

  _events () {
    const hp = Object.getOwnPropertyNames(window.HTMLElement.prototype)
    for (const p of this._props) {
      if (hp.indexOf('on' + p) === -1) continue
      this.addEventListener(p, this)
    }
  }

  _prop (o) {
    const id = this._id
    const p = `__${id}__${Tonic._createId()}__`
    Tonic._data[id] = Tonic._data[id] || {}
    Tonic._data[id][p] = o
    return p
  }

  _placehold (r) {
    const id = this._id
    const ref = `placehold:${id}:${Tonic._createId()}__`
    Tonic._children[id] = Tonic._children[id] || {}
    Tonic._children[id][ref] = r
    return ref
  }

  static match (el, s) {
    if (!el.matches) el = el.parentElement
    return el.matches(s) ? el : el.closest(s)
  }

  static getPropertyNames (proto) {
    const props = []
    while (proto && proto !== Tonic.prototype) {
      props.push(...Object.getOwnPropertyNames(proto))
      proto = Object.getPrototypeOf(proto)
    }
    return props
  }

  static add (c, htmlName) {
    const hasValidName = htmlName || (c.name && c.name.length > 1)
    if (!hasValidName) {
      throw Error('Mangling. https://bit.ly/2TkJ6zP')
    }

    if (!htmlName) htmlName = Tonic._splitName(c.name).toLowerCase()
    if (window.customElements.get(htmlName)) return

    if (!c.prototype.isTonicComponent) {
      const tmp = { [c.name]: class extends Tonic {} }[c.name]
      tmp.prototype.render = c
      c = tmp
    }

    c.prototype._props = Tonic.getPropertyNames(c.prototype)

    Tonic._reg[htmlName] = c
    Tonic._tags = Object.keys(Tonic._reg).join()
    window.customElements.define(htmlName, c)

    if (c.stylesheet) {
      Tonic.registerStyles(c.stylesheet)
    }
  }

  static registerStyles (stylesheetFn) {
    if (Tonic._stylesheetRegistry.includes(stylesheetFn)) return
    Tonic._stylesheetRegistry.push(stylesheetFn)

    const styleNode = document.createElement('style')
    if (Tonic.nonce) styleNode.setAttribute('nonce', Tonic.nonce)
    styleNode.appendChild(document.createTextNode(stylesheetFn()))
    if (document.head) document.head.appendChild(styleNode)
  }

  static escape (s) {
    return s.replace(Tonic.ESC, c => Tonic.MAP[c])
  }

  static raw (s, templateStrings) {
    return new TonicRaw(s, templateStrings)
  }

  html (strings, ...values) {
    const refs = o => {
      if (o && o.__children__) return this._placehold(o)
      if (o && o.isTonicRaw) return o.rawText
      switch (Object.prototype.toString.call(o)) {
        case '[object HTMLCollection]':
        case '[object NodeList]': return this._placehold([...o])
        case '[object Array]':
        case '[object Object]':
        case '[object Function]': return this._prop(o)
        case '[object NamedNodeMap]':
          return this._prop(Tonic._normalizeAttrs(o))
        case '[object Number]': return `${o}__float`
        case '[object String]': return Tonic.escape(o)
        case '[object Boolean]': return `${o}__boolean`
        case '[object Null]': return `${o}__null`
        case '[object HTMLElement]':
          return this._placehold([o])
      }
      if (
        typeof o === 'object' && o && o.nodeType === 1 &&
        typeof o.cloneNode === 'function'
      ) {
        return this._placehold([o])
      }
      return o
    }

    const out = []
    for (let i = 0; i < strings.length - 1; i++) {
      out.push(strings[i], refs(values[i]))
    }
    out.push(strings[strings.length - 1])

    const htmlStr = out.join('').replace(Tonic.SPREAD, (_, p) => {
      const o = Tonic._data[p.split('__')[1]][p]
      return Object.entries(o).map(([key, value]) => {
        const k = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        if (value === true) return k
        else if (value) return `${k}="${Tonic.escape(String(value))}"`
        else return ''
      }).filter(Boolean).join(' ')
    })
    return Tonic.raw(htmlStr, strings)
  }

  scheduleReRender (oldProps) {
    if (this.pendingReRender) return this.pendingReRender

    this.pendingReRender = new Promise(resolve => {
      window.requestAnimationFrame(() => {
        const p = this._set(this.root, this.render)
        this.pendingReRender = null

        if (p && p.then) {
          Tonic._maybePromise(p.then(() => {
            if (this.updated) this.updated(oldProps)
            resolve()
          }))
          return
        }

        if (this.updated) this.updated(oldProps)
        resolve()
      })
    })

    return this.pendingReRender
  }

  reRender (o = this.props) {
    const oldProps = { ...this.props }
    this.props = typeof o === 'function' ? o(oldProps) : o
    return this.scheduleReRender(oldProps)
  }

  getProps () {
    return this.props
  }

  handleEvent (e) {
    Tonic._maybePromise(this[e.type](e))
  }

  _drainIterator (target, iterator) {
    const p = iterator.next()
    return p.then((result) => {
      this._set(target, null, result.value)
      if (result.done) return
      return this._drainIterator(target, iterator)
    })
  }

  _set (target, render, content = '') {
    for (const node of target.querySelectorAll(Tonic._tags)) {
      if (!node.isTonicComponent) continue

      const id = node.getAttribute('id')
      if (!id || !Tonic._refIds.includes(id)) continue
      Tonic._states[id] = node.state
    }

    if (render instanceof Tonic.AsyncFunction) {
      const promise = render.call(this) || ''
      return promise.then((content) => {
        return this._apply(target, content)
      })
    } else if (render instanceof Tonic.AsyncFunctionGenerator) {
      const itr = render.call(this)
      return this._drainIterator(target, itr)
    } else if (render instanceof Function) {
      content = render.call(this) || ''
      return this._apply(target, content)
    }

    return this._apply(target, content)
  }

  _apply (target, content) {
    if (content && content.isTonicRaw) {
      content = content.rawText
    }

    if (typeof content === 'string') {
      if (this.stylesheet) {
        content = `<style nonce=${Tonic.nonce || ''}>${this.stylesheet()}</style>${content}`
      }

      target.innerHTML = content

      if (this.styles) {
        const styles = this.styles()
        for (const node of target.querySelectorAll('[styles]')) {
          for (const s of node.getAttribute('styles').split(/\s+/)) {
            Object.assign(node.style, styles[s.trim()])
          }
        }
      }

      const children = Tonic._children[this._id] || {}

      const walk = (node, fn) => {
        if (node.nodeType === 3) {
          const id = node.textContent.trim()
          if (children[id]) fn(node, children[id], id)
        }

        const childNodes = node.childNodes
        if (!childNodes) return

        for (let i = 0; i < childNodes.length; i++) {
          walk(childNodes[i], fn)
        }
      }

      walk(target, (node, children, id) => {
        for (const child of children) {
          node.parentNode.insertBefore(child, node)
        }
        delete Tonic._children[this._id][id]
        node.parentNode.removeChild(node)
      })
    } else {
      target.innerHTML = ''
      target.appendChild(content.cloneNode(true))
    }
  }

  connectedCallback () {
    this.root = this.shadowRoot || this

    if (this.wrap) {
      this.wrapped = this.render
      this.render = this.wrap
    }

    if (super.id && !Tonic._refIds.includes(super.id)) {
      Tonic._refIds.push(super.id)
    }
    const cc = s => s.replace(/-(.)/g, (_, m) => m.toUpperCase())

    for (const { name: _name, value } of this.attributes) {
      const name = cc(_name)
      const p = this.props[name] = value

      if (/__\w+__\w+__/.test(p)) {
        const { 1: root } = p.split('__')
        this.props[name] = Tonic._data[root][p]
      } else if (/\d+__float/.test(p)) {
        this.props[name] = parseFloat(p, 10)
      } else if (p === 'null__null') {
        this.props[name] = null
      } else if (/\w+__boolean/.test(p)) {
        this.props[name] = p.includes('true')
      } else if (/placehold:\w+:\w+__/.test(p)) {
        const { 1: root } = p.split(':')
        this.props[name] = Tonic._children[root][p][0]
      }
    }

    this.props = Object.assign(
      this.defaults ? this.defaults() : {},
      this.props
    )

    if (!this._source) {
      this._source = this.innerHTML
    } else {
      this.innerHTML = this._source
    }

    this._id = this._id || Tonic._createId()

    this.willConnect && this.willConnect()
    Tonic._maybePromise(this._set(this.root, this.render))
    Tonic._maybePromise(this.connected && this.connected())
  }

  disconnectedCallback () {
    Tonic._maybePromise(this.disconnected && this.disconnected())
    delete Tonic._data[this._id]
    delete Tonic._children[this._id]
  }
}

Tonic.prototype.isTonicComponent = true

Object.assign(Tonic, {
  _tags: '',
  _refIds: [],
  _data: {},
  _states: {},
  _children: {},
  _reg: {},
  _stylesheetRegistry: [],
  _index: 0,
  version: typeof require !== 'undefined' ? require('./package').version : null,
  SPREAD: /\.\.\.\s?(__\w+__\w+__)/g,
  ESC: /["&'<>`]/g,
  AsyncFunctionGenerator: async function * () {}.constructor,
  AsyncFunction: async function () {}.constructor,
  MAP: { '"': '&quot;', '&': '&amp;', '\'': '&#x27;', '<': '&lt;', '>': '&gt;', '`': '&#x60;' }
})

if (typeof module === 'object') module.exports = Tonic

},{"./package":50}],50:[function(require,module,exports){
module.exports={
  "_from": "@optoolco/tonic@next",
  "_id": "@optoolco/tonic@12.0.0",
  "_inBundle": false,
  "_integrity": "sha512-kRjYMv5VYGSDTSzSBPX0nCNT4NWZwyjzvdWLlhkLDeCJvw3IqZLBSP4hmoRdh4lGMbxOI/i+JfTmxCDjbj6OXg==",
  "_location": "/@optoolco/tonic",
  "_phantomChildren": {},
  "_requested": {
    "type": "tag",
    "registry": true,
    "raw": "@optoolco/tonic@next",
    "name": "@optoolco/tonic",
    "escapedName": "@optoolco%2ftonic",
    "scope": "@optoolco",
    "rawSpec": "next",
    "saveSpec": null,
    "fetchSpec": "next"
  },
  "_requiredBy": [
    "#DEV:/",
    "#USER"
  ],
  "_resolved": "https://registry.npmjs.org/@optoolco/tonic/-/tonic-12.0.0.tgz",
  "_shasum": "efe407a8c22464e898f2e664e0df9fbe7d8de58f",
  "_spec": "@optoolco/tonic@next",
  "_where": "/home/raynos/optoolco/components",
  "author": {
    "name": "optoolco"
  },
  "bugs": {
    "url": "https://github.com/optoolco/tonic/issues"
  },
  "bundleDependencies": false,
  "dependencies": {},
  "deprecated": false,
  "description": "A composable component inspired by React.",
  "devDependencies": {
    "benchmark": "^2.1.4",
    "browserify": "^16.2.2",
    "raynos-tape-puppet": "0.1.7-raynos2",
    "standard": "14.3.1",
    "tape": "^4.11.0",
    "terser": "^4.0.2",
    "uuid": "3.3.3"
  },
  "directories": {
    "test": "test"
  },
  "homepage": "https://github.com/optoolco/tonic#readme",
  "license": "MIT",
  "name": "@optoolco/tonic",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/optoolco/tonic.git"
  },
  "scripts": {
    "build:demo": "browserify --bare ./demo > ./docs/bundle.js",
    "minify": "terser index.js -c unused,dead_code,hoist_vars,loops=false,hoist_props=true,hoist_funs,toplevel,keep_classnames,keep_fargs=false -o dist/tonic.min.js",
    "test": "npm run minify && browserify test/index.js | tape-puppet"
  },
  "version": "12.0.0"
}

},{}],51:[function(require,module,exports){
(function (process,setImmediate){
var defined = require("./pre-bundled/node_modules/defined");
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require("./pre-bundled/node_modules/through");

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };

    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };

    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };

    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.onFailure = function () {
        return getHarness().onFailure.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness;

    return lazyLoad;

    function getHarness(opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness(conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });

    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1; });
    }

    var ended = false;
    stream.on('end', function () { ended = true; });

    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return;
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });

    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness(conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close(); });
    }

    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);

        (function inspectCode(st) {
            st.on('test', function sub(st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.todo && !r.ok && typeof r !== 'string') test._exitCode = 1;
            });
        })(t);

        results.push(t);
        return t;
    };
    test._results = results;

    test._tests = [];

    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };

    test.onFailure = function (cb) {
        results.on('fail', cb);
    };

    var only = false;
    test.only = function () {
        if (only) throw new Error('there can only be one only test');
        only = true;
        var t = test.apply(null, arguments);
        results.only(t);
        return t;
    };
    test._exitCode = 0;

    test.close = function () { results.close(); };

    return test;
}

}).call(this,require('_process'),require("timers").setImmediate)
},{"./lib/default_stream":52,"./lib/results":53,"./lib/test":54,"./pre-bundled/node_modules/defined":59,"./pre-bundled/node_modules/through":90,"_process":13,"timers":30}],52:[function(require,module,exports){
(function (process){
var through = require("../pre-bundled/node_modules/through");
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;

    function write(buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }

    function flush() {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e); }
        } else {
            try { console.log(line); }
            catch (e) { stream.emit('error', e); }
        }
        line = '';
    }
};

}).call(this,require('_process'))
},{"../pre-bundled/node_modules/through":90,"_process":13,"fs":3}],53:[function(require,module,exports){
(function (process,setImmediate){
var defined = require("../pre-bundled/node_modules/defined");
var EventEmitter = require('events').EventEmitter;
var inherits = require("../pre-bundled/node_modules/inherits");
var through = require("../pre-bundled/node_modules/through");
var resumer = require("../pre-bundled/node_modules/resumer");
var inspect = require("../pre-bundled/node_modules/object-inspect");
var bind = require("../pre-bundled/node_modules/function-bind");
var has = require("../pre-bundled/node_modules/has");
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function coalesceWhiteSpaces(str) {
    return String(str).replace(/\s+/g, ' ');
}

function Results() {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this.todo = 0;
    this._stream = through();
    this.tests = [];
    this._only = null;
    this._isRunning = false;
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest(t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id,
                    skip: t._skip,
                    todo: t._todo
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null); });
    } else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }

    if (!this._isRunning) {
        this._isRunning = true;
        nextTick(function next() {
            var t;
            while (t = getNextTest(self)) {
                t.run();
                if (!t.ended) return t.once('end', function () { nextTick(next); });
            }
            self.emit('done');
        });
    }

    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (t) {
    this._only = t;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s); };
    t.once('prerun', function () {
        var premsg = '';
        if (t._skip) premsg = 'SKIP ';
        else if (t._todo) premsg = 'TODO ';
        write('# ' + premsg + coalesceWhiteSpaces(t.name) + '\n');
    });

    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok || res.todo) self.pass ++;
        else {
            self.fail ++;
            self.emit('fail');
        }
    });

    t.on('test', function (st) { self._watch(st); });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s); };

    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + (self.pass + self.todo) + '\n');
    if (self.todo) write('# todo  ' + self.todo + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n');
    else write('\n# ok\n');

    self._stream.queue(null);
};

function encodeResult(res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + coalesceWhiteSpaces(res.name) : '';

    if (res.skip) {
        output += ' # SKIP' + ((typeof res.skip === 'string') ? ' ' + coalesceWhiteSpaces(res.skip) : '');
    } else if (res.todo) {
        output += ' # TODO' + ((typeof res.todo === 'string') ? ' ' + coalesceWhiteSpaces(res.todo) : '');
    };

    output += '\n';
    if (res.ok) return output;

    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';

    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected, {depth: res.objectPrintDepth});
        var ac = inspect(res.actual, {depth: res.objectPrintDepth});

        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        } else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }

    var actualStack = res.actual && (typeof res.actual === 'object' || typeof res.actual === 'function') ? res.actual.stack : undefined;
    var errorStack = res.error && res.error.stack;
    var stack = defined(actualStack, errorStack);
    if (stack) {
        var lines = String(stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }

    output += outer + '...\n';
    return output;
}

function getNextTest(results) {
    if (!results._only) {
        return results.tests.shift();
    }

    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t) {
            return t;
        }
    } while (results.tests.length !== 0);
}

function invalidYaml(str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this,require('_process'),require("timers").setImmediate)
},{"../pre-bundled/node_modules/defined":59,"../pre-bundled/node_modules/function-bind":75,"../pre-bundled/node_modules/has":78,"../pre-bundled/node_modules/inherits":79,"../pre-bundled/node_modules/object-inspect":81,"../pre-bundled/node_modules/resumer":85,"../pre-bundled/node_modules/through":90,"_process":13,"events":4,"timers":30}],54:[function(require,module,exports){
(function (process,setImmediate,__dirname){
var deepEqual = require("../pre-bundled/node_modules/deep-equal");
var defined = require("../pre-bundled/node_modules/defined");
var path = require('path');
var inherits = require("../pre-bundled/node_modules/inherits");
var EventEmitter = require('events').EventEmitter;
var has = require("../pre-bundled/node_modules/has");
var trim = require("../pre-bundled/node_modules/string.prototype.trim");
var bind = require("../pre-bundled/node_modules/function-bind");
var forEach = require("../pre-bundled/node_modules/for-each");
var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
var toLowerCase = bind.call(Function.call, String.prototype.toLowerCase);

module.exports = Test;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick;
var safeSetTimeout = setTimeout;
var safeClearTimeout = clearTimeout;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        } else if (t === 'object') {
            opts = arg || opts;
        } else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test(name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._todo = args.opts.todo || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;
    var depthEnvVar = process.env.NODE_TAPE_OBJECT_PRINT_DEPTH;
    if (args.opts.objectPrintDepth) {
        this._objectPrintDepth = args.opts.objectPrintDepth;
    } else if (depthEnvVar) {
        if (toLowerCase(depthEnvVar) === 'infinity') {
            this._objectPrintDepth = Infinity;
        } else {
            this._objectPrintDepth = depthEnvVar;
        }
    } else {
        this._objectPrintDepth = 5;
    }

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    this.emit('prerun');
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    });

    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }

    nextTick(function () {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    forEach(trim(msg).split('\n'), function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function (ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = safeSetTimeout(function () {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function () {
        safeClearTimeout(timeout);
    });
};

Test.prototype.end = function (err) {
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }

    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end(); });
        t.run();
        return;
    }

    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    } else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    return this._plan - (this._progeny.length + this.assertCount);
};

Test.prototype._assert = function assert(ok, opts) {
    var self = this;
    var extra = opts.extra || {};

    ok = !!ok || !!extra.skip;

    var res = {
        id: self.assertCount++,
        ok: ok,
        skip: defined(extra.skip, opts.skip),
        todo: defined(extra.todo, opts.todo, self._todo),
        name: defined(extra.message, opts.message, '(unnamed assert)'),
        operator: defined(extra.operator, opts.operator),
        objectPrintDepth: self._objectPrintDepth
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = !!(this._ok && ok);

    if (!ok && !res.todo) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }

    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = __dirname + path.sep;

        for (var i = 0; i < err.length; i++) {
            /*
                Stack trace lines may resemble one of the following. We need
                to should correctly extract a function name (if any) and
                path / line no. for each line.

                    at myFunction (/path/to/file.js:123:45)
                    at myFunction (/path/to/file.other-ext:123:45)
                    at myFunction (/path to/file.js:123:45)
                    at myFunction (C:\path\to\file.js:123:45)
                    at myFunction (/path/to/file.js:123)
                    at Test.<anonymous> (/path/to/file.js:123:45)
                    at Test.bound [as run] (/path/to/file.js:123:45)
                    at /path/to/file.js:123:45

                Regex has three parts. First is non-capturing group for 'at '
                (plus anything preceding it).

                    /^(?:[^\s]*\s*\bat\s+)/

                Second captures function call description (optional). This is
                not necessarily a valid JS function name, but just what the
                stack trace is using to represent a function call. It may look
                like `<anonymous>` or 'Test.bound [as run]'.

                For our purposes, we assume that, if there is a function
                name, it's everything leading up to the first open
                parentheses (trimmed) before our pathname.

                    /(?:(.*)\s+\()?/

                Last part captures file path plus line no (and optional
                column no).

                    /((?:\/|[a-zA-Z]:\\)[^:\)]+:(\d+)(?::(\d+))?)/
            */
            var re = /^(?:[^\s]*\s*\bat\s+)(?:(.*)\s+\()?((?:\/|[a-zA-Z]:\\)[^:\)]+:(\d+)(?::(\d+))?)/;
            var m = re.exec(err[i]);

            if (!m) {
                continue;
            }

            var callDescription = m[1] || '<anonymous>';
            var filePath = m[2];

            if (filePath.slice(0, dir.length) === dir) {
                continue;
            }

            // Function call description may not (just) be a function name.
            // Try to extract function name by looking at first "word" only.
            res.functionName = callDescription.split(/\s+/)[0];
            res.file = filePath;
            res.line = Number(m[3]);
            if (m[4]) res.column = Number(m[4]);

            res.at = callDescription + ' (' + filePath + ')';
            break;
        }
    }

    self.emit('result', res);

    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }

    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

function assert(value, msg, extra) {
    this._assert(value, {
        message : defined(msg, 'should be truthy'),
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
}
Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= assert;

function notOK(value, msg, extra) {
    this._assert(!value, {
        message : defined(msg, 'should be falsy'),
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
}
Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= notOK;

function error(err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
}
Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= error;

function equal(a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
}
Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= equal;

function notEqual(a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        expected : b,
        extra : extra
    });
}
Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= notEqual;

function tapeDeepEqual(a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
}
Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= tapeDeepEqual;

function deepLooseEqual(a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
}
Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= deepLooseEqual;

function notDeepEqual(a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
}
Test.prototype.notDeepEqual
= Test.prototype.notDeepEquals
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= notDeepEqual;

function notDeepLooseEqual(a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
}
Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= notDeepLooseEqual;

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        if ((err != null) && (!isEnumerable(err, 'message') || !has(err, 'message'))) {
            var message = err.message;
            delete err.message;
            err.message = message;
        }
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:

}).call(this,require('_process'),require("timers").setImmediate,"/node_modules/@pre-bundled/tape/lib")
},{"../pre-bundled/node_modules/deep-equal":55,"../pre-bundled/node_modules/defined":59,"../pre-bundled/node_modules/for-each":73,"../pre-bundled/node_modules/function-bind":75,"../pre-bundled/node_modules/has":78,"../pre-bundled/node_modules/inherits":79,"../pre-bundled/node_modules/string.prototype.trim":87,"_process":13,"events":4,"path":11,"timers":30}],55:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":56,"./lib/keys.js":57}],56:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],57:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],58:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"object-keys":83}],59:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],60:[function(require,module,exports){
'use strict';

/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;

var throwTypeError = function () { throw new $TypeError(); };
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': typeof JSON === 'object' ? JSON : undefined,
	'$ %JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': $TypeError,
	'$ %TypeErrorPrototype%': $TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = require('function-bind');
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[key];
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	if (parts.length === 0) {
		return getBaseIntrinsic(name, allowMissing);
	}

	var value = getBaseIntrinsic('%' + parts[0] + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, parts[i]);
				value = desc ? (desc.get || desc.value) : value[parts[i]];
			} else {
				value = value[parts[i]];
			}
		}
	}
	return value;
};

},{"function-bind":75,"has-symbols":76}],61:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var $Object = GetIntrinsic('%Object%');
var $EvalError = GetIntrinsic('%EvalError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');
var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');
var $floor = GetIntrinsic('%Math.floor%');
var $DateUTC = GetIntrinsic('%Date.UTC%');
var $abs = GetIntrinsic('%Math.abs%');

var assertRecord = require('./helpers/assertRecord');
var isPropertyDescriptor = require('./helpers/isPropertyDescriptor');
var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');
var sign = require('./helpers/sign');
var mod = require('./helpers/mod');
var isPrefixOf = require('./helpers/isPrefixOf');
var callBound = require('./helpers/callBound');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		return isPropertyDescriptor(this, Desc);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.9.3
	'Abstract Equality Comparison': function AbstractEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType === yType) {
			return x === y; // ES6+ specified this shortcut anyways.
		}
		if (x == null && y == null) {
			return true;
		}
		if (xType === 'Number' && yType === 'String') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if (xType === 'String' && yType === 'Number') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (xType === 'Boolean') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (yType === 'Boolean') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
			return this['Abstract Equality Comparison'](x, this.ToPrimitive(y));
		}
		if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
			return this['Abstract Equality Comparison'](this.ToPrimitive(x), y);
		}
		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.9.6
	'Strict Equality Comparison': function StrictEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType !== yType) {
			return false;
		}
		if (xType === 'Undefined' || xType === 'Null') {
			return true;
		}
		return x === y; // shortcut for steps 4-7
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.8.5
	// eslint-disable-next-line max-statements
	'Abstract Relational Comparison': function AbstractRelationalComparison(x, y, LeftFirst) {
		if (this.Type(LeftFirst) !== 'Boolean') {
			throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
		}
		var px;
		var py;
		if (LeftFirst) {
			px = this.ToPrimitive(x, $Number);
			py = this.ToPrimitive(y, $Number);
		} else {
			py = this.ToPrimitive(y, $Number);
			px = this.ToPrimitive(x, $Number);
		}
		var bothStrings = this.Type(px) === 'String' && this.Type(py) === 'String';
		if (!bothStrings) {
			var nx = this.ToNumber(px);
			var ny = this.ToNumber(py);
			if ($isNaN(nx) || $isNaN(ny)) {
				return undefined;
			}
			if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
				return false;
			}
			if (nx === 0 && ny === 0) {
				return false;
			}
			if (nx === Infinity) {
				return false;
			}
			if (ny === Infinity) {
				return true;
			}
			if (ny === -Infinity) {
				return false;
			}
			if (nx === -Infinity) {
				return true;
			}
			return nx < ny; // by now, these are both nonzero, finite, and not equal
		}
		if (isPrefixOf(py, px)) {
			return false;
		}
		if (isPrefixOf(px, py)) {
			return true;
		}
		return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	msFromTime: function msFromTime(t) {
		return mod(t, msPerSecond);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	SecFromTime: function SecFromTime(t) {
		return mod($floor(t / msPerSecond), SecondsPerMinute);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	MinFromTime: function MinFromTime(t) {
		return mod($floor(t / msPerMinute), MinutesPerHour);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	HourFromTime: function HourFromTime(t) {
		return mod($floor(t / msPerHour), HoursPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
	Day: function Day(t) {
		return $floor(t / msPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
	TimeWithinDay: function TimeWithinDay(t) {
		return mod(t, msPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	DayFromYear: function DayFromYear(y) {
		return (365 * (y - 1970)) + $floor((y - 1969) / 4) - $floor((y - 1901) / 100) + $floor((y - 1601) / 400);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	TimeFromYear: function TimeFromYear(y) {
		return msPerDay * this.DayFromYear(y);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	YearFromTime: function YearFromTime(t) {
		// largest y such that this.TimeFromYear(y) <= t
		return $getUTCFullYear(new $Date(t));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.6
	WeekDay: function WeekDay(t) {
		return mod(this.Day(t) + 4, 7);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	DaysInYear: function DaysInYear(y) {
		if (mod(y, 4) !== 0) {
			return 365;
		}
		if (mod(y, 100) !== 0) {
			return 366;
		}
		if (mod(y, 400) !== 0) {
			return 365;
		}
		return 366;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	InLeapYear: function InLeapYear(t) {
		var days = this.DaysInYear(this.YearFromTime(t));
		if (days === 365) {
			return 0;
		}
		if (days === 366) {
			return 1;
		}
		throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
	DayWithinYear: function DayWithinYear(t) {
		return this.Day(t) - this.DayFromYear(this.YearFromTime(t));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
	MonthFromTime: function MonthFromTime(t) {
		var day = this.DayWithinYear(t);
		if (0 <= day && day < 31) {
			return 0;
		}
		var leap = this.InLeapYear(t);
		if (31 <= day && day < (59 + leap)) {
			return 1;
		}
		if ((59 + leap) <= day && day < (90 + leap)) {
			return 2;
		}
		if ((90 + leap) <= day && day < (120 + leap)) {
			return 3;
		}
		if ((120 + leap) <= day && day < (151 + leap)) {
			return 4;
		}
		if ((151 + leap) <= day && day < (181 + leap)) {
			return 5;
		}
		if ((181 + leap) <= day && day < (212 + leap)) {
			return 6;
		}
		if ((212 + leap) <= day && day < (243 + leap)) {
			return 7;
		}
		if ((243 + leap) <= day && day < (273 + leap)) {
			return 8;
		}
		if ((273 + leap) <= day && day < (304 + leap)) {
			return 9;
		}
		if ((304 + leap) <= day && day < (334 + leap)) {
			return 10;
		}
		if ((334 + leap) <= day && day < (365 + leap)) {
			return 11;
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.5
	DateFromTime: function DateFromTime(t) {
		var m = this.MonthFromTime(t);
		var d = this.DayWithinYear(t);
		if (m === 0) {
			return d + 1;
		}
		if (m === 1) {
			return d - 30;
		}
		var leap = this.InLeapYear(t);
		if (m === 2) {
			return d - 58 - leap;
		}
		if (m === 3) {
			return d - 89 - leap;
		}
		if (m === 4) {
			return d - 119 - leap;
		}
		if (m === 5) {
			return d - 150 - leap;
		}
		if (m === 6) {
			return d - 180 - leap;
		}
		if (m === 7) {
			return d - 211 - leap;
		}
		if (m === 8) {
			return d - 242 - leap;
		}
		if (m === 9) {
			return d - 272 - leap;
		}
		if (m === 10) {
			return d - 303 - leap;
		}
		if (m === 11) {
			return d - 333 - leap;
		}
		throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.12
	MakeDay: function MakeDay(year, month, date) {
		if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
			return NaN;
		}
		var y = this.ToInteger(year);
		var m = this.ToInteger(month);
		var dt = this.ToInteger(date);
		var ym = y + $floor(m / 12);
		var mn = mod(m, 12);
		var t = $DateUTC(ym, mn, 1);
		if (this.YearFromTime(t) !== ym || this.MonthFromTime(t) !== mn || this.DateFromTime(t) !== 1) {
			return NaN;
		}
		return this.Day(t) + dt - 1;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.13
	MakeDate: function MakeDate(day, time) {
		if (!$isFinite(day) || !$isFinite(time)) {
			return NaN;
		}
		return (day * msPerDay) + time;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.11
	MakeTime: function MakeTime(hour, min, sec, ms) {
		if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
			return NaN;
		}
		var h = this.ToInteger(hour);
		var m = this.ToInteger(min);
		var s = this.ToInteger(sec);
		var milli = this.ToInteger(ms);
		var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
		return t;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.14
	TimeClip: function TimeClip(time) {
		if (!$isFinite(time) || $abs(time) > 8.64e15) {
			return NaN;
		}
		return $Number(new $Date(this.ToNumber(time)));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-5.2
	modulo: function modulo(x, y) {
		return mod(x, y);
	}
};

module.exports = ES5;

},{"./GetIntrinsic":60,"./helpers/assertRecord":62,"./helpers/callBound":64,"./helpers/isFinite":65,"./helpers/isNaN":66,"./helpers/isPrefixOf":67,"./helpers/isPropertyDescriptor":68,"./helpers/mod":69,"./helpers/sign":70,"es-to-primitive/es5":71,"has":78,"is-callable":80}],62:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(ES, Desc) {
		if (ES.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

module.exports = function assertRecord(ES, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(ES, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"../GetIntrinsic":60,"has":78}],63:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

var GetIntrinsic = require('../GetIntrinsic');

var $Function = GetIntrinsic('%Function%');
var $apply = $Function.apply;
var $call = $Function.call;

module.exports = function callBind() {
	return bind.apply($call, arguments);
};

module.exports.apply = function applyBind() {
	return bind.apply($apply, arguments);
};

},{"../GetIntrinsic":60,"function-bind":75}],64:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var callBind = require('./callBind');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"../GetIntrinsic":60,"./callBind":63}],65:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],66:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],67:[function(require,module,exports){
'use strict';

var $strSlice = require('../helpers/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

},{"../helpers/callBound":64}],68:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var has = require('has');
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

    for (var key in Desc) { // eslint-disable-line
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"../GetIntrinsic":60,"has":78}],69:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],70:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],71:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
var ES5internalSlots = {
	'[[DefaultValue]]': function (O) {
		var actualHint;
		if (arguments.length > 1) {
			actualHint = arguments[1];
		} else {
			actualHint = toStr.call(O) === '[object Date]' ? String : Number;
		}

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// http://ecma-international.org/ecma-262/5.1/#sec-9.1
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length > 1) {
		return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
	}
	return ES5internalSlots['[[DefaultValue]]'](input);
};

},{"./helpers/isPrimitive":72,"is-callable":80}],72:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],73:[function(require,module,exports){
'use strict';

var isCallable = require('is-callable');

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;

},{"is-callable":80}],74:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],75:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":74}],76:[function(require,module,exports){
(function (global){
'use strict';

var origSymbol = global.Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./shams":77}],77:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],78:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":75}],79:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],80:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],81:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;

var inspectCustom = require('./util.inspect').custom;
var inspectSymbol = (inspectCustom && isSymbol(inspectCustom)) ? inspectCustom : null;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
      if (obj === 0) {
        return Infinity / obj > 0 ? '0' : '-0';
      }
      return String(obj);
    }
    if (typeof obj === 'bigint') {
      return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') depth = 0;
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return '[Object]';
    }

    if (typeof seen === 'undefined') seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        return '[ ' + arrObjKeys(obj, inspect).join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) return '[' + String(obj) + ']';
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object') {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), parts);
    }
    if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), parts);
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var xs = arrObjKeys(obj, inspect);
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes (s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]'; }
function isDate (obj) { return toStr(obj) === '[object Date]'; }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]'; }
function isError (obj) { return toStr(obj) === '[object Error]'; }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]'; }
function isString (obj) { return toStr(obj) === '[object String]'; }
function isNumber (obj) { return toStr(obj) === '[object Number]'; }
function isBigInt (obj) { return toStr(obj) === '[object BigInt]'; }
function isBoolean (obj) { return toStr(obj) === '[object Boolean]'; }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return objectToString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = String(f).match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str, opts) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte (c) {
    var n = c.charCodeAt(0);
    var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
    if (x) return '\\' + x;
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
}

function markBoxed (str) {
    return 'Object(' + str + ')';
}

function collectionOf (type, size, entries) {
    return type + ' (' + size + ') {' + entries.join(', ') + '}';
}

function arrObjKeys (obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    for (var key in obj) {
        if (!has(obj, key)) continue;
        if (isArr && String(Number(key)) === key && key < obj.length) continue;
        if (/[^\w$]/.test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    return xs;
}

},{"./util.inspect":2}],82:[function(require,module,exports){
'use strict';

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = require('./isArguments'); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;

},{"./isArguments":84}],83:[function(require,module,exports){
'use strict';

var slice = Array.prototype.slice;
var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : require('./implementation');

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./implementation":82,"./isArguments":84}],84:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],85:[function(require,module,exports){
(function (process,setImmediate){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":13,"through":90,"timers":30}],86:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":61,"function-bind":75}],87:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":86,"./polyfill":88,"./shim":89,"define-properties":58,"function-bind":75}],88:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":86}],89:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":88,"define-properties":58}],90:[function(require,module,exports){
(function (process){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this,require('_process'))
},{"_process":13,"stream":29}],91:[function(require,module,exports){
const qs = (s, p) => (p || document).querySelector(s)
const qsa = (s, p) => [...(p || document).querySelectorAll(s)]

module.exports = { qs, qsa }

},{}],92:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class Panel extends Tonic {
  constructor () {
    super()

    this.addEventListener('click', e => {
      const el = Tonic.match(e.target, '.tonic--close')
      if (el) this.hide()

      const overlay = Tonic.match(e.target, '.tonic--overlay')
      if (overlay) this.hide()
    })
  }

  defaults () {
    return {
      position: 'right',
      overlay: false,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  static stylesheet () {
    return `
      .tonic--panel .tonic--panel--inner {
        color: var(--tonic-primary, #333);
        width: 500px;
        position: fixed;
        bottom: 0;
        top: 0;
        background-color: var(--tonic-window, #fff);
        box-shadow: 0px 0px 28px 0 rgba(0,0,0,0.05);
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, visibility 0.3s ease;
        opacity: 0;
        z-index: 100;
      }

      @media (max-width: 500px) .tonic--panel .tonic--panel--inner {
        width: 100%;
      }

      .tonic--panel .tonic--left .tonic--panel--inner {
        left: 0;
        -webkit-transform: translateX(-500px);
        -ms-transform: translateX(-500px);
        transform: translateX(-500px);
        border-right: 1px solid var(--tonic-border, #333);
        visibility: hidden;
      }

      .tonic--panel .tonic--right .tonic--panel--inner {
        right: 0;
        -webkit-transform: translateX(500px);
        -ms-transform: translateX(500px);
        transform: translateX(500px);
        border-left: 1px solid var(--tonic-border, #333);
        visibility: hidden;
      }

      .tonic--panel .tonic--show.tonic--right .tonic--panel--inner,
      .tonic--panel .tonic--show.tonic--left .tonic--panel--inner {
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }

      .tonic--panel .tonic--show[overlay="true"] .tonic--overlay {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease-in-out, visibility 0s ease 0s;
      }

      .tonic--panel .tonic--overlay {
        opacity: 0;
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: opacity 0.3s ease-in-out, visibility 0s ease 1s;
        z-index: 1;
      }

      .tonic--panel .tonic--close {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 30px;
        right: 30px;
        cursor: pointer;
      }

      .tonic--panel .tonic--close svg {
        width: inherit;
        height: inherit;
      }
    `
  }

  show () {
    const that = this

    return new Promise(resolve => {
      if (!that) return

      const node = that.querySelector('.tonic--wrapper')
      node.classList.add('tonic--show')
      node.addEventListener('transitionend', resolve, { once: true })

      this._escapeHandler = e => {
        if (e.keyCode === 27) that.hide()
      }

      document.addEventListener('keyup', that._escapeHandler)
    })
  }

  hide () {
    const that = this

    return new Promise(resolve => {
      if (!that) return
      const node = this.querySelector('.tonic--wrapper')
      node.classList.remove('tonic--show')
      node.addEventListener('transitionend', resolve, { once: true })
      document.removeEventListener('keyup', that._escapeHandler)
    })
  }

  async * wrap (render) {
    const {
      name,
      position,
      overlay,
      theme,
      color,
      backgroundColor
    } = this.props

    this.classList.add('tonic--panel')

    const wrapper = document.createElement('div')

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const isOpen = !!this.querySelector('.tonic--wrapper.tonic--show')
    wrapper.className = isOpen ? 'tonic--wrapper tonic--show' : 'tonic--wrapper'
    wrapper.id = 'wrapper'
    const positionAttr = position ? `tonic--${position}` : ''
    wrapper.classList.add(positionAttr)

    if (overlay) wrapper.setAttribute('overlay', true)
    if (name) wrapper.setAttribute('name', name)

    // create panel
    const panel = document.createElement('div')
    panel.className = 'tonic--panel--inner'

    if (overlay !== 'false') {
      const overlayElement = document.createElement('div')
      overlayElement.className = 'tonic--overlay'
      overlayElement.style.backgroundColor = backgroundColor
      wrapper.appendChild(overlayElement)
    }

    // create template
    const closeIcon = document.createElement('div')
    closeIcon.className = 'tonic--close'

    // create SVG
    const svgns = 'http://www.w3.org/2000/svg'
    const xlinkns = 'http://www.w3.org/1999/xlink'
    const svg = document.createElementNS(svgns, 'svg')
    const use = document.createElementNS(svgns, 'use')

    closeIcon.appendChild(svg)
    svg.appendChild(use)

    const iconColor = color || 'var(--tonic-primary, #333)'

    use.setAttributeNS(xlinkns, 'href', '#close')
    use.setAttributeNS(xlinkns, 'xlink:href', '#close')
    use.setAttribute('color', iconColor)
    use.setAttribute('fill', iconColor)

    const contentContainer = document.createElement('div')
    contentContainer.className = 'tonic--dialog--content-container'

    // append everything
    wrapper.appendChild(panel)
    wrapper.appendChild(panel)
    panel.appendChild(contentContainer)
    panel.appendChild(closeIcon)

    yield wrapper

    const setContent = content => {
      if (!content) return

      if (typeof content === 'string') {
        contentContainer.innerHTML = content
      } else if (content.isTonicRaw) {
        contentContainer.innerHTML = content.rawText
      } else {
        [...content.childNodes].forEach(el => contentContainer.appendChild(el))
      }
    }

    if (this.wrapped instanceof Tonic.AsyncFunction) {
      setContent(await this.wrapped() || '')
      return wrapper
    }

    if (this.wrapped instanceof Tonic.AsyncFunctionGenerator) {
      const itr = this.wrapped()
      while (true) {
        const { value, done } = await itr.next()
        setContent(value)

        if (done) {
          return wrapper
        }

        yield wrapper
      }
    } else if (this.wrapped instanceof Function) {
      setContent(this.wrapped() || '')
      return wrapper
    }

    return wrapper
  }
}

module.exports = { Panel }

},{"@optoolco/tonic":49}],93:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')
const Tonic = require('@optoolco/tonic')
const { Panel } = require('./index')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

class ExamplePanel extends Panel {
  async click (e) {
    if (e.target.value === 'close') {
      return this.hide()
    }
  }

  render () {
    return `
      <div class="tonic--header">Panel Example</div>
      <div class="tonic--main">
        <h3>${this.props.title || 'Hello'}
      </div>
      <div class="tonic--footer">
        <tonic-button value="close">Close</tonic-button>
      </div>
    `
  }
}

Tonic.add(ExamplePanel)

document.body.appendChild(html`
<section id="panel">
  <h2>Panel</h2>

  <div class="test-container">
    <span>Default Panel</span>
    <tonic-button id="example-panel-default-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel id="example-panel-default">
  </example-panel>

  <!-- Panel Default -->
  <div class="test-container">
    <span>name="panel-name"</span>
    <tonic-button id="example-panel-name-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-name"
    name="panel-name">
  </example-panel>

  <!-- Panel Overlay -->
  <div class="test-container">
    <span>overlay="true"</span>
    <tonic-button id="example-panel-overlay-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-overlay"
    overlay="true">
  </example-panel>

  <!-- Panel w/ Position Right -->
  <div class="test-container">
    <span>position="right"</span>
    <tonic-button id="example-panel-position-right-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-position-right"
    overlay="true"
    position="right">
  </example-panel>

  <!-- Panel w/ Position Left -->
  <div class="test-container">
    <span>position="left"</span>
    <tonic-button id="example-panel-position-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-position"
    overlay="true"
    position="left">
  </example-panel>

  <!-- Panel w/ Background Color -->
  <div class="test-container">
    <span>background-color="rgba(255,255,255,0.8)"</span>
    <tonic-button id="example-panel-background-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-background"
    overlay="true"
    background-color="rgba(255,255,255,0.8)">
  </example-panel>

  <!-- Panel w/ Theme Light -->
  <div class="test-container">
    <span>theme="light"</span>
    <tonic-button id="example-panel-theme-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-theme"
    overlay="true"
    theme="light">
  </example-panel>

  <!-- Panel w/ Theme Dark -->
  <div class="test-container dark">
    <span>theme="dark"</span>
    <tonic-button id="example-panel-theme-dark-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-theme-dark"
    overlay="true"
    theme="dark">
  </example-panel>

</section>
`)

//
// Panel Default
//
const panelDefaultButton = document.getElementById('example-panel-default-button')
const panelDefault = document.getElementById('example-panel-default')

panelDefaultButton.addEventListener('click', e => panelDefault.show())

//
// Panel Name
//
const panelNameButton = document.getElementById('example-panel-name-button')
const panelName = document.getElementById('example-panel-name')

panelNameButton.addEventListener('click', e => panelName.show())

//
// Panel Overlay
//
const panelOverlayButton = document.getElementById('example-panel-overlay-button')
const panelOverlay = document.getElementById('example-panel-overlay')

panelOverlayButton.addEventListener('click', e => panelOverlay.show())

//
// Panel w/ Position Right
//
const panelPositionRightButton = document.getElementById('example-panel-position-right-button')
const panelPositionRight = document.getElementById('example-panel-position-right')

panelPositionRightButton.addEventListener('click', e => panelPositionRight.show())

//
// Panel w/ Position Left
//
const panelPositionButton = document.getElementById('example-panel-position-button')
const panelPosition = document.getElementById('example-panel-position')

panelPositionButton.addEventListener('click', e => panelPosition.show())

//
// Panel w/ Background Color
//
const panelBackgroundButton = document.getElementById('example-panel-background-button')
const panelBackground = document.getElementById('example-panel-background')

panelBackgroundButton.addEventListener('click', e => panelBackground.show())

//
// Panel w/ Theme Light
//
const panelThemeLightButton = document.getElementById('example-panel-theme-button')
const panelThemeLight = document.getElementById('example-panel-theme')

panelThemeLightButton.addEventListener('click', e => panelThemeLight.show())

//
// Panel w/ Theme Dark
//
const panelThemeDarkButton = document.getElementById('example-panel-theme-dark-button')
const panelThemeDark = document.getElementById('example-panel-theme-dark')

panelThemeDarkButton.addEventListener('click', e => panelThemeDark.show())

tape('opening a panel', async t => {
  const container = qs('#example-panel-default')
  const wrapper = qs('.tonic--wrapper', container)
  const overlay = qs('.tonic--overlay', wrapper)
  const inner = qs('.tonic--panel--inner', wrapper)
  const contentContainer = qs('.tonic--dialog--content-container', inner)
  const main = qs('.tonic--main', contentContainer)
  const h3 = qs('h3', main)

  t.ok(container)
  t.ok(wrapper)
  t.ok(overlay)
  t.ok(inner)
  t.ok(main)
  t.ok(h3)

  t.equal(h3.textContent.trim(), 'Hello')

  const styles1 = window.getComputedStyle(inner)
  t.equal(styles1.visibility, 'hidden')

  await container.show()

  const styles2 = window.getComputedStyle(inner)
  t.equal(styles2.visibility, 'visible')

  await sleep(128)
  await container.hide()

  const styles3 = window.getComputedStyle(inner)
  t.equal(styles3.visibility, 'hidden')

  t.end()
})

function sleep (n) {
  return new Promise(resolve => {
    setTimeout(resolve, n)
  })
}

},{"..":46,"../test/util":112,"./index":92,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],94:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicPopover extends Tonic {
  constructor () {
    super()

    const target = this.getAttribute('for')
    const el = document.getElementById(target)

    el.addEventListener('click', e => this.show(el))
  }

  defaults (props) {
    return {
      width: 'auto',
      height: 'auto',
      padding: '15px',
      margin: 10,
      position: 'bottomleft'
    }
  }

  static stylesheet () {
    return `
      tonic-popover .tonic--overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        display: none;
        z-index: 0;
        background-color: rgba(0,0,0,0);
      }

      tonic-popover .tonic--popover {
        position: absolute;
        top: 30px;
        background: var(--tonic-window, #fff);
        border: 1px solid var(--tonic-border, #ccc);
        border-radius: 2px;
        visibility: hidden;
        z-index: -1;
        opacity: 0;
        -webkit-transform: scale(0.75);
        ms-transform: scale(0.75);
        transform: scale(0.75);
        transition: transform 0.1s ease-in-out, opacity 0s ease 0.1s, visibility 0s ease 0.1s, z-index 0s ease 0.1s;
      }

      tonic-popover .tonic--popover.tonic--show {
        box-shadow: 0px 30px 90px -20px rgba(0, 0, 0, 0.3);
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        visibility: visible;
        transition: transform 0.15s ease-in-out;
        opacity: 1;
        z-index: 1;
      }

      tonic-popover .tonic--show ~ .tonic--overlay {
        display: block;
        opacity: 1;
      }

      tonic-popover .tonic--popover--top {
        transform-origin: bottom center;
      }

      tonic-popover .tonic--popover--topleft {
        transform-origin: bottom left;
      }

      tonic-popover .tonic--popover--topright {
        transform-origin: bottom right;
      }

      tonic-popover .tonic--popover--bottom {
        transform-origin: top center;
      }

      tonic-popover .tonic--popover--bottomleft {
        transform-origin: top left;
      }

      tonic-popover .tonic--popover--bottomright {
        transform-origin: top right;
      }

    `
  }

  styles () {
    const {
      width,
      height,
      padding,
      margin,
      position
    } = this.props

    return {
      popover: {
        width,
        height,
        padding,
        margin,
        position
      }
    }
  }

  show (triggerNode) {
    const popover = this.querySelector('.tonic--popover')
    let scrollableArea = triggerNode.parentNode

    while (true) {
      if (!scrollableArea || scrollableArea.tagName === 'BODY') break
      if (window.getComputedStyle(scrollableArea).overflow === 'scroll') break
      scrollableArea = scrollableArea.parentNode
    }

    const margin = parseInt(this.props.margin, 10)
    let { top, left } = triggerNode.getBoundingClientRect()
    let pos = top + scrollableArea.scrollTop
    left -= scrollableArea.offsetLeft

    switch (this.props.position) {
      case 'topleft':
        pos -= popover.offsetHeight + margin
        break
      case 'topright':
        pos -= popover.offsetHeight + margin
        left += (triggerNode.offsetWidth - popover.offsetWidth)
        break
      case 'top':
        pos -= popover.offsetHeight + margin
        left += (triggerNode.offsetWidth / 2) - (popover.offsetWidth / 2)
        break
      case 'bottomleft':
        pos += triggerNode.offsetHeight + margin
        break
      case 'bottomright':
        pos += triggerNode.offsetHeight + margin
        left += triggerNode.offsetWidth - popover.offsetWidth
        break
      case 'bottom':
        pos += triggerNode.offsetHeight + margin
        left += (triggerNode.offsetWidth / 2) - (popover.offsetWidth / 2)
        break
    }

    popover.style.top = `${pos}px`
    popover.style.left = `${left}px`

    window.requestAnimationFrame(() => {
      popover.className = `tonic--popover tonic--show tonic--popover--${this.props.position}`
      const event = new window.Event('show')
      this.dispatchEvent(event)
    })
  }

  hide () {
    const popover = this.querySelector('.tonic--popover')
    if (popover) popover.classList.remove('tonic--show')
  }

  connected () {
    if (!this.props.open) return
    const target = this.getAttribute('for')
    this.show(document.getElementById(target))
  }

  click (e) {
    if (Tonic.match(e.target, '.tonic--overlay')) {
      return this.hide()
    }
  }

  render () {
    const {
      theme
    } = this.props

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    return this.html`
      <div class="tonic--popover" styles="popover">
        ${this.nodes}
      </div>
      <div class="tonic--overlay"></div>
    `
  }
}

module.exports = { TonicPopover }

},{"@optoolco/tonic":49}],95:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')
const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="popover">
  <h2>Popover</h2>

  <!-- Popover Default -->
  <div class="test-container">
    <span>Default Popover</span>
    <tonic-button id="tonic-popover-default-button">
      Open Popover
    </tonic-button>
  </div>

  <tonic-popover
    id="tonic-popover-default"
    width="175px"
    for="tonic-popover-default-button">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </tonic-popover>

</section>
`)

//
// Panel Default
//
const popover = document.getElementById('tonic-popover-default')
popover.addEventListener('show', event => {
  document.body.addEventListener('click', e => {
    popover.hide()
  }, { once: true })
})

// TODO: write tests for popover.
tape('opening popover', async t => {
  const container = qs('#popover')
  const popover = qs('#tonic-popover-default', container)
  const button = qs('#tonic-popover-default-button', container)

  t.ok(popover)
  t.ok(button)

  const popoverCont = qs('.tonic--popover', popover)
  t.ok(popoverCont)

  const divs = popoverCont.querySelectorAll('div')
  t.equal(divs.length, 3)

  const styles = window.getComputedStyle(divs[0])
  t.equal(styles.visibility, 'hidden')

  button.querySelector('button').click()
  await sleep(128)

  const styles2 = window.getComputedStyle(divs[0])
  t.equal(styles2.visibility, 'visible')

  t.end()
})

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],96:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicProfileImage extends Tonic {
  get value () {
    const state = this.state
    return state.data || this.props.src
  }

  defaults () {
    return {
      src: TonicProfileImage.svg.default(),
      size: '50px',
      radius: '5px'
    }
  }

  static stylesheet () {
    return `
      tonic-profile-image {
        display: inline-block;
      }

      tonic-profile-image .tonic--wrapper {
        position: relative;
        overflow: hidden;
      }

      tonic-profile-image .tonic--image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      tonic-profile-image .tonic--overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        transition: opacity 0.2s ease-in-out;
        visibility: hidden;
        opacity: 0;
        display: flex;
      }

      tonic-profile-image .tonic--overlay .tonic--icon {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      tonic-profile-image .tonic--overlay .tonic--icon svg {
        width: inherit;
        height: inherit;
      }

      tonic-profile-image .tonic--wrapper.tonic--editable:hover .tonic--overlay {
        visibility: visible;
        opacity: 1;
        cursor: pointer;
      }
    `
  }

  styles () {
    const {
      src,
      size,
      border,
      radius
    } = this.props

    return {
      background: {
        backgroundImage: `url('${src}')`
      },
      hidden: {
        display: 'none'
      },
      wrapper: {
        width: size,
        height: size,
        border: border,
        borderRadius: radius
      }
    }
  }

  getPictureData (src, cb) {
    const reader = new window.FileReader()
    reader.onerror = err => cb(err)
    reader.onload = e => cb(null, e.target.result)
    reader.readAsDataURL(src)
  }

  click (e) {
    if (this.props.editable) {
      if (this.props.editable === 'false') return
      const fileInput = this.getElementsByTagName('input')[0]
      fileInput.click()
    }
  }

  change (e) {
    const fileInput = this.getElementsByTagName('input')[0]
    const data = fileInput.files[0]
    if (e.data) return
    e.stopPropagation()

    const {
      size,
      type,
      path,
      lastModifiedDate
    } = data

    this.getPictureData(data, (err, data) => {
      if (err) {
        const event = new window.Event('error')
        event.message = err.message
        this.dispatchEvent(event)
        return
      }

      const slot = this.querySelector('.tonic--image')

      this.state.size = size
      this.state.path = path
      this.state.time = type
      this.state.mtime = lastModifiedDate
      this.state.data = data

      slot.style.backgroundImage = 'url("' + data + '")'
      const event = new window.Event('change', { bubbles: true })
      event.data = true // prevent recursion
      this.dispatchEvent(event)
    })
  }

  render () {
    const {
      theme,
      editable
    } = this.props

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const classes = ['tonic--wrapper']
    if (editable === 'true') classes.push('tonic--editable')

    return this.html`
      <div
        class="${classes.join(' ')}"
        styles="wrapper">

        <div
          class="tonic--image"
          styles="background">
        </div>

        <input type="file" styles="hidden"/>

        <div class="tonic--overlay">
          <div class="tonic--icon">
            <svg>
              <use
                href="#edit"
                xlink:href="#edit"
                color="#fff"
                fill="#fff">
              </use>
            </svg>
          </div>
        </div>
      </div>
    `
  }
}

TonicProfileImage.svg = {}
TonicProfileImage.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
TonicProfileImage.svg.default = () => TonicProfileImage.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect fill="#F0F0F0" width="100" height="100"></rect>
    <circle fill="#D6D6D6" cx="49.3" cy="41.3" r="21.1"></circle>
    <path fill="#D6D6D6" d="M48.6,69.5c-18.1,0-33.1,13.2-36,30.5h72C81.8,82.7,66.7,69.5,48.6,69.5z"></path>
  </svg>
`)

module.exports = { TonicProfileImage }

},{"@optoolco/tonic":49}],97:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')
const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="profile-image">
  <tonic-sprite></tonic-sprite>
  <h2>Profile Image</h2>

  <!-- Profile Image Default -->
  <div class="test-container">
    <span>Default Profile Image</span>
    <tonic-profile-image
      id="profile-image-default">
    </tonic-profile-image>
  </div>

  <!-- Profile with id -->
  <div class="test-container">
    <span>id="profile-image-id"</span>
    <tonic-profile-image
      id="profile-image-id">
    </tonic-profile-image>
  </div>

  <!-- Profile with name -->
  <div class="test-container">
    <span>name="profile-name"</span>
    <tonic-profile-image
      id="profile-image-name"
      name="profile-name">
    </tonic-profile-image>
  </div>

  <!-- Profile with src -->
  <div class="test-container">
    <span>src="/sampleprofile.jpg"</span>
    <tonic-profile-image
      id="profile-image-src"
      src="/sampleprofile.jpg"
      size="100px">
    </tonic-profile-image>
  </div>

  <!-- Profile with size -->
  <div class="test-container">
    <span>size="100px"</span>
    <tonic-profile-image
      id="profile-image-size"
      size="100px">
    </tonic-profile-image>
  </div>

  <!-- Profile with radius -->
  <div class="test-container">
    <span>radius="50%"</span>
    <tonic-profile-image
      id="profile-image-radius"
      radius="50%"
      size="100px">
    </tonic-profile-image>
  </div>

  <!-- Profile with border -->
  <div class="test-container">
    <span>border="3px solid black"</span>
    <tonic-profile-image
      id="profile-image-border"
      border="3px solid black"
      size="100px">
    </tonic-profile-image>
  </div>

  <!-- Profile editable -->
  <div class="test-container">
    <span>editable="true"</span>
    <tonic-profile-image
      id="profile-image-editable"
      editable="true"
      size="100px">
    </tonic-profile-image>
  </div>

  <!-- Profile not editable -->
  <div class="test-container">
    <span>editable="false"</span>
    <tonic-profile-image
      id="profile-image-editable-false"
      editable="false"
      size="100px">
    </tonic-profile-image>
  </div>

  <!-- Profile theme light -->
  <div class="test-container">
    <span>theme="light"</span>
    <tonic-profile-image
      id="profile-image-theme-light"
      theme="light"
      size="100px">
    </tonic-profile-image>
  </div>

  <!-- Profile theme dark -->
  <div class="test-container dark">
    <span>theme="dark"</span>
    <tonic-profile-image
      id="profile-image-theme-dark"
      theme="dark"
      size="100px">
    </tonic-profile-image>
  </div>

</section>
`)

// TODO: write tests for profile-image
tape('test a profile image', t => {
  const img = qs('#profile-image-default')
  const imgDiv = qs('.tonic--image', img)
  const input = qs('input', img)
  const overlay = qs('.tonic--overlay', img)

  t.ok(img)
  t.ok(imgDiv)
  t.ok(input)
  t.ok(overlay)

  const styles = window.getComputedStyle(imgDiv)
  const styles2 = window.getComputedStyle(overlay)
  t.equal(styles.position, 'absolute')
  t.equal(styles2.position, 'absolute')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],98:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicProgressBar extends Tonic {
  set value (value) {
    this.setProgress(value)
  }

  get value () {
    if (typeof this.state.progress !== 'undefined') {
      return this.state.progress
    }

    return this.props.progress
  }

  defaults () {
    return {
      width: '280px',
      height: '15px',
      progress: 0
    }
  }

  static stylesheet () {
    return `
      tonic-progress-bar {
        display: inline-block;
        user-select: none;
      }

      tonic-progress-bar .tonic--wrapper {
        position: relative;
        background-color: var(--tonic-background, #fff);
      }

      tonic-progress-bar .tonic--wrapper .tonic--progress {
        background-color: var(--tonic-accent, #f66);
        width: 0%;
        height: 100%;
      }
    `
  }

  styles () {
    const progress = this.state.progress || this.props.progress
    return {
      wrapper: {
        width: this.props.width,
        height: this.props.height
      },
      progress: {
        width: progress + '%',
        backgroundColor: this.props.color || 'var(--tonic-accent, #f66)'
      }
    }
  }

  setProgress (progress) {
    this.state.progress = progress
    this.reRender()
  }

  render () {
    if (this.props.theme) {
      this.classList.add(`tonic--theme--${this.props.theme}`)
    }

    this.style.width = this.props.width
    this.style.height = this.props.height

    return this.html`
      <div class="tonic--wrapper" styles="wrapper">
        <div class="tonic--progress" styles="progress"></div>
      </div>
    `
  }
}

module.exports = { TonicProgressBar }

},{"@optoolco/tonic":49}],99:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')
const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="progress-bar">
  <h2>Progress Bar</h2>

  <!-- Progress Bar Default -->
  <div class="test-container">
    <span>Default Progress Bar</span>
    <tonic-progress-bar
      id="progress-bar-default">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Auto -->
  <div class="test-container">
    <span>Progress Bar (automatic with js)</span>
    <tonic-progress-bar
      id="progress-bar-auto">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Default -->
  <div class="test-container">
    <span>Progress Bar - 30%</span>
    <tonic-progress-bar
      id="progress-bar-30">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Width px -->
  <div class="test-container">
    <span>width="150px"</span>
    <tonic-progress-bar
      id="progress-bar-width"
      width="150px">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Width % -->
  <div class="test-container">
    <span>width="100%"</span>
    <tonic-progress-bar
      id="progress-bar-width-100"
      width="100%">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Height -->
  <div class="test-container">
    <span>height="40px"</span>
    <tonic-progress-bar
      id="progress-bar-height"
      height="40px">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Color -->
  <div class="test-container">
    <span>color="purple"</span>
    <tonic-progress-bar
      id="progress-bar-color"
      color="purple">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Theme Light -->
  <div class="test-container">
    <span>theme="light"</span>
    <tonic-progress-bar
      id="progress-bar-theme-light"
      theme="light">
    </tonic-progress-bar>
  </div>

  <!-- Progress Bar Theme Dark -->
  <div class="test-container flex-half dark">
    <span>theme="dark"</span>
    <tonic-progress-bar
      id="progress-bar-theme-dark"
      theme="dark">
    </tonic-progress-bar>
  </div>

</section>
`)

const progressBar30 = document.getElementById('progress-bar-30')
progressBar30.setProgress(30)

const progressBarWidth = document.getElementById('progress-bar-width')
progressBarWidth.value = 75

const progressBarWidth100 = document.getElementById('progress-bar-width-100')
progressBarWidth100.value = 50

const progressBarHeight = document.getElementById('progress-bar-height')
progressBarHeight.value = 25

const progressBarColor = document.getElementById('progress-bar-color')
progressBarColor.value = 40

const progressBarThemeLight = document.getElementById('progress-bar-theme-light')
progressBarThemeLight.value = 60

const progressBarThemeDark = document.getElementById('progress-bar-theme-dark')
progressBarThemeDark.value = 60

let percentage = 0
let reps = 0
let interval = null

const progressBarAuto = document.getElementById('progress-bar-auto')

clearInterval(interval)
interval = setInterval(() => {
  progressBarAuto.setProgress(percentage++)
  if (progressBarAuto.value >= 100) percentage = 0
  if (++reps === 200) clearInterval(interval)
}, 128)

// TODO: convert to tape tests.
tape('get a progress bar', t => {
  const bar = qs('#progress-bar-30')
  const wrapper = qs('.tonic--wrapper', bar)
  const progress = qs('.tonic--progress', wrapper)

  t.ok(bar)
  t.ok(wrapper)
  t.ok(progress)

  const wrapperStyles = window.getComputedStyle(wrapper)

  const styles = window.getComputedStyle(progress)

  const outerWidth = parseInt(wrapperStyles.width, 10)
  const innerWidth = parseInt(styles.width, 10)
  t.ok(innerWidth / outerWidth === 0.3)

  t.equal(styles.height, '15px')
  t.equal(styles.backgroundColor, 'rgb(255, 102, 102)')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],100:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicRange extends Tonic {
  defaults () {
    return {
      width: '250px',
      disabled: false,
      min: '0',
      max: '100',
      value: '50'
    }
  }

  get value () {
    return this.state.value
  }

  set value (value) {
    this.querySelector('input').value = value
    this.setValue(value)
  }

  setValue (value) {
    const min = this.props.min
    const max = this.props.max

    const input = this.querySelector('input')

    if (this.props.label) {
      const label = this.querySelector('label')
      label.textContent = this.getLabelValue(value)
    }

    input.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'

    this.state.value = value
  }

  input (e) {
    this.setValue(e.target.value || this.props.value)
  }

  static stylesheet () {
    return `
      tonic-range  {
        position: relative;
        display: -webkit-flex;
        display: flex;
        height: 50px;
        padding: 20px 0;
      }

      tonic-range label {
        font: 13px var(--tonic-subheader, 'Arial', sans-serif);
        letter-spacing: 1px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }

      tonic-range input[type="range"] {
        margin: auto;
        padding: 0;
        width: 50%;
        height: 4px;
        background-color: var(--tonic-background, #fff);
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--tonic-accent, #f66)), color-stop(100%, var(--tonic-accent, #f66)));
        background-image: -webkit-linear-gradient(var(--tonic-accent, #f66), var(--tonic-accent, #f66));
        background-image: -moz-linear-gradient(var(--tonic-accent, #f66), var(--tonic-accent, #f66));
        background-image: -o-linear-gradient(var(--tonic-accent, #f66), var(--tonic-accent, #f66));
        background-image: linear-gradient(var(--tonic-accent, #f66), var(--tonic-accent, #f66));
        background-size: 50% 100%;
        background-repeat: no-repeat;
        border-radius: 0;
        cursor: pointer;
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]:disabled {
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, var(--tonic-border, #ccc)), color-stop(100%, var(--tonic-border, #ccc)));
        background-image: -webkit-linear-gradient(var(--tonic-border, #ccc), var(--tonic-border, #ccc));
        background-image: -moz-linear-gradient(var(--tonic-border, #ccc), var(--tonic-border, #ccc));
        background-image: -o-linear-gradient(var(--tonic-border, #ccc), var(--tonic-border, #ccc));
        background-image: linear-gradient(var(--tonic-border, #ccc), var(--tonic-border, #ccc));
      }

      tonic-range input[type="range"]::-webkit-slider-runnable-track {
        box-shadow: none;
        border: none;
        background: transparent;
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]::-moz-range-track {
        box-shadow: none;
        border: none;
        background: transparent;
      }

      tonic-range input[type="range"]::-moz-focus-outer {
        border: 0;
      }

      tonic-range input[type="range"]::-webkit-slider-thumb {
        width: 18px;
        height: 18px;
        border: 0;
        background: #fff;
        border-radius: 100%;
        box-shadow: 0 0 3px 0px rgba(0,0,0,0.25);
        -webkit-appearance: none;
      }

      tonic-range input[type="range"]::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border: 0;
        background: #fff;
        border-radius: 100%;
        box-shadow: 0 0 1px 0px rgba(0,0,0,0.1);
      }
    `
  }

  getLabelValue (value) {
    if (this.setLabel) {
      return this.setLabel(value)
    } else if (this.props.label) {
      return this.props.label.replace(/%\w/, value)
    } else {
      return value
    }
  }

  renderLabel () {
    if (!this.props.label) return ''
    const value = this.props.value
    return this.html`<label>${this.getLabelValue(value)}</label>`
  }

  styles () {
    const {
      width
    } = this.props

    return {
      width: {
        width
      }
    }
  }

  connected () {
    this.setValue(this.state.value)
  }

  render () {
    const {
      width,
      height,
      disabled,
      theme,
      min,
      max,
      step,
      id,
      tabindex
    } = this.props

    if (width) this.style.width = width
    if (height) this.style.width = height
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (tabindex) this.removeAttribute('tabindex')

    const value = this.props.value || this.state.value
    if (typeof this.state.value === 'undefined') {
      this.state.value = value
    }

    return this.html`
      ${this.renderLabel()}
      <div class="tonic--wrapper" styles="width">
        <input ... ${{
          type: 'range',
          styles: 'width',
          id,
          value,
          tabindex,
          step,
          min,
          max,
          disabled: disabled === 'true'
        }}/>
      </div>
    `
  }
}

module.exports = { TonicRange }

},{"@optoolco/tonic":49}],101:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')
const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="range">
  <h2>Range</h2>

  <!-- Range Default -->
  <div class="test-container">
    <span>Default Range Input</span>
    <tonic-range id="range-default"></tonic-range>
  </div>

  <!-- Range w/ id -->
  <div class="test-container">
    <span>id="range-id"</span>
    <tonic-range id="range-id"></tonic-range>
  </div>

  <!-- Range w/ name -->
  <div class="test-container">
    <span>name="range-name"</span>
    <tonic-range id="range-name" name="range-name"></tonic-range>
  </div>

  <!-- Disabled range -->
  <div class="test-container">
    <span>disabled="true"</span>
    <tonic-range id="range-disabled-true" disabled="true"></tonic-range>
  </div>

  <!-- Non-disabled range -->
  <div class="test-container">
    <span>disabled="false"</span>
    <tonic-range id="range-disabled-false" disabled="false"></tonic-range>
  </div>

  <!-- Range w/ Width px -->
  <div class="test-container">
    <span>width="100px"</span>
    <tonic-range id="range-width" width="100px"></tonic-range>
  </div>

  <!-- Range w/ Width % -->
  <div class="test-container">
    <span>width="100%"</span>
    <tonic-range id="range-width-full" width="100%"></tonic-range>
  </div>

  <!-- Range w/ Height px -->
  <div class="test-container">
    <span class="fail">height="10px"</span>
    <tonic-range id="range-height" width="10px"></tonic-range>
  </div>

  <!-- Range w/ Height % -->
  <div class="test-container">
    <span>height="100%"</span>
    <tonic-range id="range-height-full" height="100%"></tonic-range>
  </div>

  <!-- Range w/ Radius -->
  <div class="test-container">
    <span>radius="2px"</span>
    <tonic-range id="range-radius" height="2px"></tonic-range>
  </div>

  <!-- Range w/ min -->
  <div class="test-container">
    <span>min="15"</span>
    <tonic-range id="range-min" label="%i%" min="15"></tonic-range>
  </div>

  <!-- Range w/ max -->
  <div class="test-container">
    <span>max="120"</span>
    <tonic-range id="range-max" label="%i%" max="120"></tonic-range>
  </div>

  <!-- Range w/ step -->
  <div class="test-container">
    <span>step="25"</span>
    <tonic-range id="range-step" label="%i%" step="25"></tonic-range>
  </div>

  <!-- Range w/ label -->
  <div class="test-container">
    <span>label="%i%"</span>
    <tonic-range id="range-label" label="%i%"></tonic-range>
  </div>

  <!-- Range w/ thumb color -->
  <div class="test-container">
    <span>thumb-color="red"</span>
    <tonic-range id="range-thumb-color" thumb-color="red"></tonic-range>
  </div>

  <!-- Range w/ thumb radius -->
  <div class="test-container">
    <span>thumb-radius="0px"</span>
    <tonic-range id="range-thumb-radius" thumb-radius="0px"></tonic-range>
  </div>

  <!-- Range w/ value -->
  <div class="test-container">
    <span>value="90"</span>
    <tonic-range id="range-thumb-value" value="90"></tonic-range>
  </div>

  <!-- Range w/ value (js) -->
  <div class="test-container">
    <span>js (value = 15)</span>
    <tonic-range id="range-thumb-value-js"></tonic-range>
  </div>

  <!-- Range w/ theme light -->
  <div class="test-container">
    <span>theme="light"</span>
    <tonic-range id="range-theme-light" theme="light"></tonic-range>
  </div>

  <!-- Range w/ theme dark -->
  <div class="test-container flex-half dark">
    <span>theme="dark"</span>
    <tonic-range id="range-theme-dark" theme="dark"></tonic-range>
  </div>

</section>
`)

const rangeValue = document.getElementById('range-thumb-value-js')
rangeValue.value = 15

// TODO: convert to tape tests
tape('test a range elem', t => {
  const range = qs('#range-default')
  const range2 = qs('#range-thumb-value')

  t.equal(range.value, '50')
  t.equal(range2.value, '90')

  const input = qs('input', range)
  t.ok(input)

  const styles = window.getComputedStyle(input)
  t.equal(styles.height, '4px')

  const input2 = qs('input', range2)
  const styles2 = window.getComputedStyle(input2)
  t.equal(styles2.backgroundSize, '90% 100%')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],102:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function pad (num) {
  return `0${num}`.slice(-2)
}

function strftime (time, formatString) {
  const day = time.getDay()
  const date = time.getDate()
  const month = time.getMonth()
  const year = time.getFullYear()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  return formatString.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, (_arg) => {
    let match
    const modifier = _arg[1]

    switch (modifier) {
      case '%':
        return '%'
      case 'a':
        return weekdays[day].slice(0, 3)
      case 'A':
        return weekdays[day]
      case 'b':
        return months[month].slice(0, 3)
      case 'B':
        return months[month]
      case 'c':
        return time.toString()
      case 'd':
        return pad(date)
      case 'e':
        return String(date)
      case 'H':
        return pad(hour)
      case 'I':
        return pad(strftime(time, '%l'))
      case 'l':
        if (hour === 0 || hour === 12) {
          return String(12)
        } else {
          return String((hour + 12) % 12)
        }
      case 'm':
        return pad(month + 1)
      case 'M':
        return pad(minute)
      case 'p':
        if (hour > 11) {
          return 'PM'
        } else {
          return 'AM'
        }
      case 'P':
        if (hour > 11) {
          return 'pm'
        } else {
          return 'am'
        }
      case 'S':
        return pad(second)
      case 'w':
        return String(day)
      case 'y':
        return pad(year % 100)
      case 'Y':
        return String(year)
      case 'Z':
        match = time.toString().match(/\((\w+)\)$/)
        return match ? match[1] : ''
      case 'z':
        match = time.toString().match(/\w([+-]\d\d\d\d) /)
        return match ? match[1] : ''
    }
    return ''
  })
}

function makeFormatter (options) {
  let format

  return function () {
    if (format) {
      return format
    }

    if ('Intl' in window) {
      try {
        format = new Intl.DateTimeFormat(undefined, options)
        return format
      } catch (e) {
        if (!(e instanceof RangeError)) {
          throw e
        }
      }
    }
  }
}

let dayFirst = null
const dayFirstFormatter = makeFormatter({ day: 'numeric', month: 'short' })

// Private: Determine if the day should be formatted before the month name in
// the user's current locale. For example, `9 Jun` for en-GB and `Jun 9`
// for en-US.
//
// Returns true if the day appears before the month.
function isDayFirst () {
  if (dayFirst !== null) {
    return dayFirst
  }

  const formatter = dayFirstFormatter()
  if (formatter) {
    const output = formatter.format(new Date(0))
    dayFirst = !!output.match(/^\d/)
    return dayFirst
  } else {
    return false
  }
}

let yearSeparator = null

const yearFormatter = makeFormatter({
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

// Private: Determine if the year should be separated from the month and day
// with a comma. For example, `9 Jun 2014` in en-GB and `Jun 9, 2014` in en-US.
//
// Returns true if the date needs a separator.
function isYearSeparator () {
  if (yearSeparator !== null) {
    return yearSeparator
  }

  const formatter = yearFormatter()

  if (formatter) {
    const output = formatter.format(new Date(0))
    yearSeparator = !!output.match(/\d,/)
    return yearSeparator
  } else {
    return true
  }
}

function isThisYear (date) {
  const now = new Date()
  return now.getUTCFullYear() === date.getUTCFullYear()
}

function makeRelativeFormat (locale, options) {
  if ('Intl' in window && 'RelativeTimeFormat' in window.Intl) {
    try {
      return new Intl.RelativeTimeFormat(locale, options)
    } catch (e) {
      if (!(e instanceof RangeError)) {
        throw e
      }
    }
  }
}

function localeFromElement (el) {
  const container = el.closest('[lang]')

  if (container instanceof window.HTMLElement && container.lang) {
    return container.lang
  }

  return 'default'
}

class RelativeTime {
  constructor (date, locale) {
    this.date = date
    this.locale = locale
  }

  toString () {
    const ago = this.timeElapsed()

    if (ago) {
      return ago
    }

    const ahead = this.timeAhead()

    if (ahead) {
      return ahead
    } else {
      return `on ${this.formatDate()}`
    }
  }

  get value () {
    return this.date
  }

  timeElapsed ({ date = this.date, locale = this.locale } = {}) {
    const ms = new Date().getTime() - date.getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)

    if (ms >= 0 && day < 30) {
      return this.timeAgoFromMs({ ms, date, locale })
    } else {
      return null
    }
  }

  timeAhead ({ date = this.date, locale = this.locale } = {}) {
    const ms = date.getTime() - new Date().getTime()
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    if (ms >= 0 && day < 30) {
      return this.timeUntil({ date, locale })
    } else {
      return null
    }
  }

  timeAgo ({ date = this.date, locale = this.locale } = {}) {
    const ms = new Date().getTime() - date.getTime()
    return this.timeAgoFromMs({ ms, date, locale })
  }

  timeAgoFromMs ({ ms, locale = this.locale } = {}) {
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)

    if (ms < 0) {
      return formatRelativeTime(locale, 0, 'second')
    } else if (sec < 10) {
      return formatRelativeTime(locale, 0, 'second')
    } else if (sec < 45) {
      return formatRelativeTime(locale, -sec, 'second')
    } else if (sec < 90) {
      return formatRelativeTime(locale, -min, 'minute')
    } else if (min < 45) {
      return formatRelativeTime(locale, -min, 'minute')
    } else if (min < 90) {
      return formatRelativeTime(locale, -hr, 'hour')
    } else if (hr < 24) {
      return formatRelativeTime(locale, -hr, 'hour')
    } else if (hr < 36) {
      return formatRelativeTime(locale, -day, 'day')
    } else if (day < 30) {
      return formatRelativeTime(locale, -day, 'day')
    } else if (month < 12) {
      return formatRelativeTime(locale, -month, 'month')
    } else if (month < 18) {
      return formatRelativeTime(locale, -year, 'year')
    } else {
      return formatRelativeTime(locale, -year, 'year')
    }
  }

  timeUntil ({ date = this.date, locale = this.locale } = {}) {
    const ms = date.getTime() - new Date().getTime()
    return this.timeUntilFromMs({ ms, locale })
  }

  timeUntilFromMs ({ ms, locale = this.locale } = {}) {
    const sec = Math.round(ms / 1000)
    const min = Math.round(sec / 60)
    const hr = Math.round(min / 60)
    const day = Math.round(hr / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)

    if (month >= 18) {
      return formatRelativeTime(locale, year, 'year')
    } else if (month >= 12) {
      return formatRelativeTime(locale, year, 'year')
    } else if (day >= 45) {
      return formatRelativeTime(locale, month, 'month')
    } else if (day >= 30) {
      return formatRelativeTime(locale, month, 'month')
    } else if (hr >= 36) {
      return formatRelativeTime(locale, day, 'day')
    } else if (hr >= 24) {
      return formatRelativeTime(locale, day, 'day')
    } else if (min >= 90) {
      return formatRelativeTime(locale, hr, 'hour')
    } else if (min >= 45) {
      return formatRelativeTime(locale, hr, 'hour')
    } else if (sec >= 90) {
      return formatRelativeTime(locale, min, 'minute')
    } else if (sec >= 45) {
      return formatRelativeTime(locale, min, 'minute')
    } else if (sec >= 10) {
      return formatRelativeTime(locale, sec, 'second')
    } else {
      return formatRelativeTime(locale, 0, 'second')
    }
  }

  formatDate ({ date = this.date } = {}) {
    let format = isDayFirst() ? '%e %b' : '%b %e'

    if (!isThisYear(date)) {
      format += isYearSeparator() ? ', %Y' : ' %Y'
    }

    return strftime(date, format)
  }

  formatTime ({ date = this.date } = {}) {
    const formatter = timeFormatter()

    if (formatter) {
      return formatter.format(date)
    } else {
      return strftime(date, '%l:%M%P')
    }
  }
}

function formatRelativeTime (locale, value, unit) {
  const formatter = makeRelativeFormat(locale, { numeric: 'auto' })

  if (formatter) {
    return formatter.format(value, unit)
  } else {
    return formatEnRelativeTime(value, unit)
  }
}

// Simplified "en" RelativeTimeFormat.format function
//
// Values should roughly match
//   new Intl.RelativeTimeFormat('en', {numeric: 'auto'}).format(value, unit)
//
function formatEnRelativeTime (value, unit) {
  if (value === 0) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `this ${unit}`
      case 'day':
        return 'today'
      case 'hour':
      case 'minute':
        return `in 0 ${unit}s`
      case 'second':
        return 'now'
    }
  } else if (value === 1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `next ${unit}`
      case 'day':
        return 'tomorrow'
      case 'hour':
      case 'minute':
      case 'second':
        return `in 1 ${unit}`
    }
  } else if (value === -1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `last ${unit}`
      case 'day':
        return 'yesterday'
      case 'hour':
      case 'minute':
      case 'second':
        return `1 ${unit} ago`
    }
  } else if (value > 1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
        return `in ${value} ${unit}s`
    }
  } else if (value < -1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
        return `${-value} ${unit}s ago`
    }
  }

  throw new RangeError(`Invalid unit argument for format() '${unit}'`)
}

class TonicRelativeTime extends Tonic {
  render () {
    let date = this.props.date || ''
    const locale = this.props.locale || localeFromElement(this)

    if (typeof date === 'string') {
      date = this.props.date = new Date(this.props.date)
    }

    if (date.toString() === 'Invalid Date') {
      date = new Date()
    }

    if (this.props.refresh) {
      this.interval = setInterval(() => {
        this.reRender(props => ({
          ...props,
          date
        }))
      }, +this.props.refresh)
    }

    const t = new RelativeTime(date, locale)
    return t.toString()
  }
}

const timeFormatter = makeFormatter({
  hour: 'numeric',
  minute: '2-digit'
})

module.exports = { TonicRelativeTime, RelativeTime }

},{"@optoolco/tonic":49}],103:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicRouter extends Tonic {
  constructor () {
    super()

    if (TonicRouter.patched) return
    TonicRouter.patched = true

    const patchEvent = function (type) {
      const orig = window.history[type]
      return function (...args) {
        const value = orig.call(this, ...args)

        window.dispatchEvent(new window.Event(type.toLowerCase()))
        TonicRouter.route()

        return value
      }
    }

    window.addEventListener('popstate', e => TonicRouter.route())
    window.history.pushState = patchEvent('pushState')
    window.history.replaceState = patchEvent('replaceState')
  }

  static route (routes, reset) {
    routes = routes || [...document.getElementsByTagName('tonic-router')]
    const keys = []
    let defaultRoute = null
    let hasMatch = false
    TonicRouter.props = {}

    for (const route of routes) {
      const path = route.getAttribute('path')

      route.removeAttribute('match')

      if (!path) {
        defaultRoute = route
        defaultRoute.reRender && defaultRoute.reRender()
        continue
      }

      const matcher = TonicRouter.matcher(path, keys)
      const match = matcher.exec(window.location.pathname)

      if (match) {
        route.setAttribute('match', true)
        hasMatch = true

        match.slice(1).forEach((m, i) => {
          TonicRouter.props[keys[i].name] = m
        })
      } else {
        route.removeAttribute('match')
      }

      if (!reset) {
        route.reRender && route.reRender()
      }
    }

    if (!reset && !hasMatch && defaultRoute) {
      defaultRoute.setAttribute('match', true)
      defaultRoute.reRender && defaultRoute.reRender()
    }
  }

  willConnect () {
    this.template = document.createElement('template')
    this.template.innerHTML = this.innerHTML
    TonicRouter.route([this], true)
  }

  updated () {
    if (this.hasAttribute('match')) {
      this.dispatchEvent(new window.Event('match'))
    }
  }

  render () {
    if (this.hasAttribute('match')) {
      this.state = TonicRouter.props
      return this.template.content
    }

    return ''
  }
}

TonicRouter.matcher = (() => {
  //
  // Most of this was lifted from the path-to-regex project which can
  // be found here -> https://github.com/pillarjs/path-to-regexp
  //
  const DEFAULT_DELIMITER = '/'
  const DEFAULT_DELIMITERS = './'

  const PATH_REGEXP = new RegExp([
    '(\\\\.)',
    '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
  ].join('|'), 'g')

  function parse (str, options) {
    const tokens = []
    let key = 0
    let index = 0
    let path = ''
    const defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
    const delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
    let pathEscaped = false
    let res

    while ((res = PATH_REGEXP.exec(str)) !== null) {
      const m = res[0]
      const escaped = res[1]
      const offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length

      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        pathEscaped = true
        continue
      }

      let prev = ''
      const next = str[index]
      const name = res[2]
      const capture = res[3]
      const group = res[4]
      const modifier = res[5]

      if (!pathEscaped && path.length) {
        const k = path.length - 1

        if (delimiters.indexOf(path[k]) > -1) {
          prev = path[k]
          path = path.slice(0, k)
        }
      }

      if (path) {
        tokens.push(path)
        path = ''
        pathEscaped = false
      }

      const partial = prev !== '' && next !== undefined && next !== prev
      const repeat = modifier === '+' || modifier === '*'
      const optional = modifier === '?' || modifier === '*'
      const delimiter = prev || defaultDelimiter
      const pattern = capture || group

      tokens.push({
        name: name || key++,
        prefix: prev,
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        partial: partial,
        pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
      })
    }

    if (path || index < str.length) {
      tokens.push(path + str.substr(index))
    }

    return tokens
  }

  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
  }

  function escapeGroup (group) {
    return group.replace(/([=!:$/()])/g, '\\$1')
  }

  function flags (options) {
    return options && options.sensitive ? '' : 'i'
  }

  function regexpToRegexp (path, keys) {
    if (!keys) return path

    const groups = path.source.match(/\((?!\?)/g)

    if (groups) {
      for (let i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          partial: false,
          pattern: null
        })
      }
    }

    return path
  }

  function arrayToRegexp (path, keys, options) {
    const parts = []

    for (let i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }

    return new RegExp('(?:' + parts.join('|') + ')', flags(options))
  }

  function stringToRegexp (path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options)
  }

  function tokensToRegExp (tokens, keys, options) {
    options = options || {}

    const strict = options.strict
    const end = options.end !== false
    const delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
    const delimiters = options.delimiters || DEFAULT_DELIMITERS
    const endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
    let route = ''
    let isEndDelimited = tokens.length === 0

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (typeof token === 'string') {
        route += escapeString(token)
        isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
      } else {
        const prefix = escapeString(token.prefix)
        const capture = token.repeat
          ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
          : token.pattern

        if (keys) keys.push(token)

        if (token.optional) {
          if (token.partial) {
            route += prefix + '(' + capture + ')?'
          } else {
            route += '(?:' + prefix + '(' + capture + '))?'
          }
        } else {
          route += prefix + '(' + capture + ')'
        }
      }
    }

    if (end) {
      if (!strict) route += '(?:' + delimiter + ')?'

      route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
    } else {
      if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
      if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
    }

    return new RegExp('^' + route, flags(options))
  }

  function pathToRegexp (path, keys, options) {
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys)
    }

    if (Array.isArray(path)) {
      return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
    }

    return stringToRegexp(/** @type {string} */ (path), keys, options)
  }

  return pathToRegexp
})()

module.exports = { TonicRouter }

},{"@optoolco/tonic":49}],104:[function(require,module,exports){
const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="router">
  <h2>Router</h2>

  <div class="test-container">
    <span>Router examples</span>
    <tonic-select
      id="tonic-router-select"
      value="/"
      label="Select a URL">
      <option value="/">/</option>
      <option value="/bar/100">/bar/100</option>
      <option value="/beepboop">/beepboop</option>
    </tonic-select>

    <!-- Router w/ path -->
    <tonic-router id="page1" path="/">
      <i>Hello, World</i>
    </tonic-router>

    <!-- Router w/ id -->
    <tonic-router id="page2" path="/bar/:number">
      <b>number</b> prop has the value <b id="page2-number"></b>.
    </tonic-router>

    <!-- Router w/ none -->
    <tonic-router id="404">
      404
    </tonic-router>
  </div>

</section>
`)

const select = document.getElementById('tonic-router-select')
const page2 = document.getElementById('page2')

select.addEventListener('change', e => {
  window.history.pushState({}, '', select.value)
})

page2.addEventListener('match', () => {
  const { number } = page2.state
  const el = document.getElementById('page2-number')
  if (!el) return
  el.textContent = number
})

// TODO: convert to tape tests

},{"..":46,"../test/util":112,"@optoolco/tonic":49}],105:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicSelect extends Tonic {
  defaults () {
    return {
      disabled: false,
      iconArrow: TonicSelect.svg.default(),
      width: '250px',
      radius: '2px'
    }
  }

  static stylesheet () {
    return `
      tonic-select .tonic--wrapper {
        position: relative;
      }

      tonic-select .tonic--wrapper:before {
        content: '';
        width: 14px;
        height: 14px;
        opacity: 0;
        z-index: 1;
      }

      tonic-select.tonic--loading {
        pointer-events: none;
        transition: background 0.3s ease;
      }

      tonic-select.tonic--loading select {
        color: transparent;
        background-color: var(--tonic-window, #fff);
        border-color: var(--tonic-border, #ccc);
      }

      tonic-select.tonic--loading .tonic--wrapper:before {
        margin-top: -8px;
        margin-left: -8px;
        display: block;
        position: absolute;
        bottom: 10px;
        left: 50%;
        opacity: 1;
        transform: translateX(-50%);
        border: 2px solid var(--tonic-medium, #999);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      tonic-select select {
        color: var(--tonic-primary, #333);
        font: 14px var(--tonic-monospace, 'Andale Mono', monospace);
        background-color: var(--tonic-window, #fff);
        background-repeat: no-repeat;
        background-position: center right;
        border: 1px solid var(--tonic-border, #ccc);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: relative;
      }

      tonic-select select:not([multiple]) {
        padding: 10px 30px 10px 10px;
      }

      tonic-select select[disabled] {
        background-color: var(--tonic-background, #fff);
      }

      tonic-select label {
        color: var(--tonic-medium, #999);
        font: 12px/14px var(--tonic-subheader, 'Arial', sans-serif);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      tonic-select[multiple] select {
        background-image: none !important;
      }

      tonic-select[multiple] select option {
        padding: 6px 10px;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
  }

  get value () {
    const el = this.querySelector('select')

    if (this.props.multiple === 'true') {
      const value = [...el.options]
        .filter(el => el.selected)
        .map(el => el.getAttribute('value'))
      return value
    }

    return el.value
  }

  selectOptions (value) {
    const el = this.querySelector('select')
    const options = [...el.options]

    options.forEach(el => {
      el.selected = value.findIndex(v => v === el.value) > -1
    })
  }

  set value (value) {
    const multiSelect = (this.props.multiple === 'true') && Array.isArray(value)
    const el = this.root.querySelector('select')

    if (multiSelect) {
      this.selectOptions(value)
    } else if (!value) {
      value = el.selectedIndex
      el.selectedIndex = 0
    } else {
      el.value = value
    }
  }

  get option () {
    const node = this.querySelector('select')
    return node.options[node.selectedIndex]
  }

  get selectedIndex () {
    const node = this.querySelector('select')
    return node.selectedIndex
  }

  set selectedIndex (index) {
    const node = this.querySelector('select')
    node.selectedIndex = index
  }

  loading (state) {
    const method = state ? 'add' : 'remove'
    this.classList[method]('tonic--loading')
  }

  renderLabel () {
    if (!this.props.label) return ''
    return this.html`<label>${this.props.label}</label>`
  }

  styles () {
    const {
      height,
      width,
      padding,
      radius,
      iconArrow
    } = this.props

    return {
      wrapper: {
        width
      },
      select: {
        width,
        height,
        borderRadius: radius,
        padding,
        backgroundImage: `url('${iconArrow}')`
      }
    }
  }

  connected () {
    const value = this.props.value

    if (Array.isArray(value)) {
      this.selectOptions(value)
    } else if (value) {
      const option = this.querySelector(`option[value="${value}"]`)
      if (option) option.setAttribute('selected', true)
    }
  }

  render () {
    const {
      width,
      height,
      disabled,
      required,
      multiple,
      theme,
      name,
      size,
      tabindex
    } = this.props

    if (width) this.style.width = width
    if (height) this.style.width = height
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (name) this.removeAttribute('name')
    if (tabindex) this.removeAttribute('tabindex')

    return this.html`
      <div class="tonic--wrapper" styles="wrapper">
        ${this.renderLabel()}
        <select ... ${{
          styles: 'select',
          disabled: disabled === 'true',
          multiple: multiple === 'true',
          name,
          tabindex,
          required,
          size
        }}>
          ${this.childNodes}
        </select>
      </div>
    `
  }
}

TonicSelect.svg = {}
TonicSelect.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`
TonicSelect.svg.default = () => TonicSelect.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="#D7DBDD" d="M61.4,45.8l-11,13.4c-0.2,0.3-0.5,0.3-0.7,0l-11-13.4c-0.3-0.3-0.1-0.8,0.4-0.8h22C61.4,45,61.7,45.5,61.4,45.8z"/>
  </svg>
`)

module.exports = { TonicSelect }

},{"@optoolco/tonic":49}],106:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')
const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="select">
  <h2>Select</h2>

  <!-- Default select -->
  <div class="test-container">
    <span>Default Select</span>
    <tonic-select id='default-select'>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Empty select -->
  <div class="test-container">
    <span>Empty Select</span>
    <tonic-select></tonic-select>
  </div>

  <!-- Select w/ id -->
  <div class="test-container">
    <span>id="select-id"</span>
    <tonic-select id="select-id">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Select w/ name -->
  <div class="test-container">
    <span>name="select-name"</span>
    <tonic-select name="select-name">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Required select -->
  <div class="test-container">
    <span>required="true"</span>
    <tonic-select required="true">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Non-required select -->
  <div class="test-container">
    <span>required="false"</span>
    <tonic-select required="false">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Disabled select -->
  <div class="test-container">
    <span>disabled="true"</span>
    <tonic-select disabled="true">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Non-disabled select -->
  <div class="test-container">
    <span>disabled="false"</span>
    <tonic-select disabled="false">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Select with label -->
  <div class="test-container">
    <span>label="Label"</span>
    <tonic-select label="Label">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Select with width % -->
  <div class="test-container">
    <span>width="100%"</span>
    <tonic-select width="100%">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Select with height -->
  <div class="test-container">
    <span>height="60px"</span>
    <tonic-select height="60px">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Select with radius -->
  <div class="test-container">
    <span>radius="8px"</span>
    <tonic-select radius="8px">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Select with value -->
  <div class="test-container">
    <span>value="c"</span>
    <tonic-select value="c">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Select with theme light -->
  <div class="test-container">
    <span>theme="light"</span>
    <tonic-select theme="light">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Select with theme dark -->
  <div class="test-container flex-half dark">
    <span>theme="dark"</span>
    <tonic-select theme="dark">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </tonic-select>
  </div>

  <!-- Multiple select -->
  <div class="test-container">
    <span>multiple="true"</span>
    <tonic-select multiple="true">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
      <option value="d">Option D</option>
      <option value="e">Option E</option>
    </tonic-select>
  </div>

  <!-- Multiple select, width % -->
  <div class="test-container">
    <span>multiple="true", width="100%"</span>
    <tonic-select multiple="true" width="100%">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
      <option value="d">Option D</option>
      <option value="e">Option E</option>
    </tonic-select>
  </div>

  <!-- Multiple select, size -->
  <div class="test-container">
    <span>multiple="true", size="3"</span>
    <tonic-select multiple="true" size="3">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
      <option value="d">Option D</option>
      <option value="e">Option E</option>
    </tonic-select>
  </div>

</section>
`)

// TODO: write tests
tape('test a select', t => {
  const select = qs('#default-select')

  t.ok(select.querySelector('select'))
  t.equal(
    select.querySelectorAll('select option').length,
    3
  )

  const styles = window.getComputedStyle(
    select.querySelector('select')
  )
  t.equal(styles.color, 'rgb(51, 51, 51)')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],107:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicSprite extends Tonic {
  static stylesheet () {
    return `
      tonic-sprite svg {
        visibility: hidden;
        height: 0;
      }
    `
  }

  render () {
    return this.html`
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">

        <symbol id="close" viewBox="0 0 100 100">
          <title>Close</title>
          <desc>Close Icon</desc>
          <path fill="currentColor" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4
            l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0
            l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
        </symbol>

        <symbol id="danger" viewBox="0 0 100 100">
          <path fill="currentColor" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M53.9,76.4h-7.6V68h7.6V76.4z M53.9,60.5h-7.6V25.6h7.6V60.5z"/>
        </symbol>

        <symbol id="warning" viewBox="0 0 100 100">
          <path fill="currentColor" d="M98.6,86.6l-46-79.7c-1.2-2-4-2-5.2,0l-46,79.7c-1.2,2,0.3,4.5,2.6,4.5h92C98.3,91.1,99.8,88.6,98.6,86.6z M53.9,80.4h-7.6V72h7.6V80.4z M53.9,64.5h-7.6V29.6h7.6V64.5z"/>
        </symbol>

        <symbol id="success" viewBox="0 0 100 100">
          <path fill="currentColor" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M43.4,71.5L22,50.1l4.8-4.8L43.4,62l28.5-28.5l4.8,4.8L43.4,71.5z"/>
        </symbol>

        <symbol id="info" viewBox="0 0 100 100">
          <path fill="currentColor" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M54.1,75.5h-8.1v-7.8h8.1V75.5z M64.1,47.6c-0.8,1.1-2.4,2.7-4.8,4.5L57,54c-1.4,1.1-2.3,2.3-2.7,3.7c-0.3,0.8-0.4,2-0.4,3.6h-8c0.1-3.4,0.5-5.8,1-7.1c0.5-1.3,2-2.9,4.3-4.7l2.4-1.9c0.8-0.6,1.5-1.3,2-2.1c0.9-1.3,1.4-2.8,1.4-4.3c0-1.8-0.5-3.4-1.6-4.9c-1.1-1.5-3-2.3-5.8-2.3c-2.7,0-4.7,0.9-5.9,2.8c-1,1.6-1.6,3.3-1.7,5.1h-8.6c0.4-5.9,2.5-10.1,6.4-12.6l0,0c2.5-1.6,5.7-2.5,9.4-2.5c4.9,0,9,1.2,12.2,3.5c3.2,2.3,4.8,5.7,4.8,10.3C66.2,43.4,65.5,45.7,64.1,47.6z"/>
        </symbol>

        <symbol id="profileimage" viewBox="0 0 100 100">
          <rect fill="#F0F0F0" width="100" height="100"></rect>
          <circle fill="#D6D6D6" cx="49.3" cy="41.3" r="21.1"></circle>
          <path fill="#D6D6D6" d="M48.6,69.5c-18.1,0-33.1,13.2-36,30.5h72C81.8,82.7,66.7,69.5,48.6,69.5z"></path>
        </symbol>

        <symbol id="edit" viewBox="0 0 100 100">
          <path fill="currentColor" d="M79.8,32.8L67.5,20.5c-0.2-0.2-0.5-0.2-0.7,0L25.2,62.1c-0.1,0.1-0.1,0.1-0.1,0.2L20.8,79c0,0.2,0,0.4,0.1,0.5c0.1,0.1,0.2,0.1,0.4,0.1c0,0,0.1,0,0.1,0l16.6-4.4c0.1,0,0.2-0.1,0.2-0.1l41.6-41.6C79.9,33.3,79.9,33,79.8,32.8z M67.1,25.8l7.3,7.3L36.9,70.7l-7.3-7.3L67.1,25.8z M33,72.4l-6.8,1.8l1.8-6.9L33,72.4z"/>
        </symbol>

        <symbol id="checked" viewBox="0 0 100 100">
          <path fill="currentColor" d="M79.7,1H21.3C10.4,1,1.5,9.9,1.5,20.8v58.4C1.5,90.1,10.4,99,21.3,99h58.4c10.9,0,19.8-8.9,19.8-19.8V20.8C99.5,9.9,90.6,1,79.7,1z M93.3,79.3c0,7.5-6.1,13.6-13.6,13.6H21.3c-7.5,0-13.6-6.1-13.6-13.6V20.9c0-7.5,6.1-13.6,13.6-13.6V7.2h58.4c7.5,0,13.6,6.1,13.6,13.6V79.3z"/>
          <polygon points="44,61.7 23.4,41.1 17.5,47 44,73.5 85.1,32.4 79.2,26.5 "/>
        </symbol>

        <symbol id="unchecked" viewBox="0 0 100 100">
          <path fill="currentColor" d="M79.7,99H21.3C10.4,99,1.5,90.1,1.5,79.2V20.8C1.5,9.9,10.4,1,21.3,1h58.4c10.9,0,19.8,8.9,19.8,19.8v58.4C99.5,90.1,90.6,99,79.7,99z M21.3,7.3c-7.5,0-13.6,6.1-13.6,13.6v58.4c0,7.5,6.1,13.6,13.6,13.6h58.4c7.5,0,13.6-6.1,13.6-13.6V20.8c0-7.5-6.1-13.6-13.6-13.6H21.3V7.3z"/>
        </symbol>

      </svg>
    `
  }
}

module.exports = { TonicSprite }

},{"@optoolco/tonic":49}],108:[function(require,module,exports){
(function (setImmediate){
const Tonic = require('@optoolco/tonic')

const CustomEvent = window.CustomEvent

class TonicTabs extends Tonic {
  static stylesheet () {
    return `
      tonic-tabs .tonic--tab {
        -webkit-appearance: none;
        user-select: none;
      }
    `
  }

  get value () {
    const currentTab = this.querySelector('[aria-selected="true"]')
    if (currentTab) return currentTab.parentNode.id
  }

  set selected (value) {
    const tab = document.getElementById(value)
    if (tab) tab.click()
  }

  setVisibility (id, forAttr) {
    const tabs = this.querySelectorAll('tonic-tab')

    for (const tab of tabs) {
      const control = tab.getAttribute('for')
      const anchor = tab.querySelector('a')

      if (!control) {
        throw new Error(`No "for" attribute found for tab id "${tab.id}".`)
      }

      const panel = document.getElementById(control)

      if (!panel) {
        throw new Error(`No panel found that matches the id (${control})`)
      }

      if (tab.id === id || control === forAttr) {
        panel.removeAttribute('hidden')
        if (tab.id === id) {
          anchor.setAttribute('aria-selected', 'true')
        } else {
          anchor.setAttribute('aria-selected', 'false')
        }
        this.state.selected = id
        this.dispatchEvent(new CustomEvent(
          'tabvisible', { detail: { id }, bubbles: true }
        ))
      } else {
        panel.setAttribute('hidden', '')
        anchor.setAttribute('aria-selected', 'false')
        this.dispatchEvent(new CustomEvent(
          'tabhidden', { detail: { id }, bubbles: true }
        ))
      }
    }
  }

  click (e) {
    const tab = Tonic.match(e.target, '.tonic--tab')
    if (!tab) return

    e.preventDefault()
    this.setVisibility(tab.parentNode.id, tab.getAttribute('for'))
  }

  keydown (e) {
    const triggers = this.querySelectorAll('.tonic--tab')

    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        const index = triggers.indexOf(e.target)
        const direction = (e.code === 'ArrowLeft') ? -1 : 1
        const length = triggers.length
        const newIndex = (index + length + direction) % length

        triggers[newIndex].focus()
        e.preventDefault()
        break
      }
      case 'Space': {
        const isActive = Tonic.match(e.target, '.tonic--tab:focus')
        if (!isActive) return

        e.preventDefault()

        const id = isActive.parentNode.getAttribute('id')
        this.setVisibility(id)
        break
      }
    }
  }

  connected () {
    const id = this.state.selected || this.props.selected
    setImmediate(() => this.setVisibility(id))
  }

  render () {
    this.setAttribute('role', 'tablist')

    return this.html`${this.childNodes}`
  }
}

class TonicTabPanel extends Tonic {
  static stylesheet () {
    return `
      tonic-tab-panel {
        display: block;
      }
      tonic-tab-panel[hidden] {
        display: none;
      }
    `
  }

  connected () {
    const tab = document.querySelector(`.tonic--tab[for="${this.props.id}"]`)
    if (!tab) return
    const tabid = tab.getAttribute('id')
    this.setAttribute('aria-labelledby', tabid)
  }

  render () {
    this.setAttribute('role', 'tabpanel')

    return this.html`
      ${this.childNodes}
    `
  }
}

class TonicTab extends Tonic {
  render () {
    const ariaControls = this.props.for

    return this.html`
      <a
        id="${this.id}-anchor"
        for="${this.props.for}"
        class="tonic--tab"
        href="#"
        role="tab"
        aria-controls="${ariaControls}"
        aria-selected="false"
      >
        ${this.childNodes}
      </a>
    `
  }
}

module.exports = {
  TonicTabs,
  TonicTab,
  TonicTabPanel
}

}).call(this,require("timers").setImmediate)
},{"@optoolco/tonic":49,"timers":30}],109:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="tabs">
  <h2>Tabs</h2>

  <!-- Default tabs -->
  <div id="tabs-1" class="test-container">
    <span>Default Tabs</span>

    <tonic-tabs id="tonic-tabs-1" selected="tab-2">
      <tonic-tab
        id="tab-1"
        for="tab-panel-1">One</tonic-tab>
      <tonic-tab
        id="tab-2"
        for="tab-panel-2">Two</tonic-tab>
      <tonic-tab
        id="tab-3"
        for="tab-panel-3">Three</tonic-tab>
    </tonic-tabs>

    <tonic-tab-panel id="tab-panel-1">Content One</tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-2">Content Two</tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-3">Content Three</tonic-tab-panel>
  </div>

  <!-- Default tabs -->
  <div id="tabs-2" class="test-container">
    <span>Tabs with nesting</span>

    <tonic-tabs id="tonic-tabs-2" selected="tab-4">
      <tonic-tab
        id="tab-4"
        for="tab-panel-4">One</tonic-tab>
      <tonic-tab
        id="tab-5"
        for="tab-panel-5">Two</tonic-tab>
      <tonic-tab
        id="tab-6"
        for="tab-panel-6">Three</tonic-tab>
    </tonic-tabs>

    <tonic-tab-panel id="tab-panel-4">
      <tonic-select value="b">
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
      </tonic-select>
    </tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-5">

      <tonic-accordion id="accordion-1">
        <tonic-accordion-section
          name="accordion-test-4b"
          id="accordion-test-4b"
          data="preview"
          label="Accordion Test 4b">
          Whatever
        </tonic-accordion-section>
        <tonic-accordion-section
          name="accordion-test-5b"
          id="accordion-test-5b"
          label="Accordion Test 5b">
          Some Content
        </tonic-accordion-section>
        <tonic-accordion-section
          name="accordion-test-6b"
          id="accordion-test-6b"
          label="Accordion Test 6b">
          The visual design includes features intended to help users understand that the accordion provides enhanced keyboard navigation functions. When an accordion header button has keyboard focus, the styling of the accordion container and all its header buttons is changed.
        </tonic-accordion-section>
      </tonic-accordion>
    </tonic-tab-panel>
    <tonic-tab-panel id="tab-panel-6">Content Three</tonic-tab-panel>
  </div>

  <!-- Tabs inside another component -->
  <div id="tabs-3" class="test-container">
    <component-container id="xxx">
      <span>Tabs inanother component</span>

      <tonic-tabs id="tabs-7" selected="tab-7">
        <tonic-tab
          id="tab-7"
          for="tab-panel-7">One</tonic-tab>
        <tonic-tab
          id="tab-8"
          for="tab-panel-8">Two</tonic-tab>
        <tonic-tab
          id="tab-9"
          for="tab-panel-9">Three</tonic-tab>
      </tonic-tabs>

      <tonic-tab-panel id="tab-panel-7">
        <tonic-select value="b">
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
        </tonic-select>
      </tonic-tab-panel>

      <tonic-tab-panel id="tab-panel-8">

        <tonic-accordion id="accordion-2">
          <tonic-accordion-section
            name="accordion-test-7"
            id="accordion-test-7"
            data="preview"
            label="Accordion Test 7">
            Whatever
          </tonic-accordion-section>
          <tonic-accordion-section
            name="accordion-test-8"
            id="accordion-test-8"
            label="Accordion Test 8">
            Some Content
          </tonic-accordion-section>
          <tonic-accordion-section
            name="accordion-test-9"
            id="accordion-test-9"
            label="Accordion Test 9">
            The visual design includes features intended to help users understand that the accordion provides enhanced keyboard navigation functions. When an accordion header button has keyboard focus, the styling of the accordion container and all its header buttons is changed.
          </tonic-accordion-section>
        </tonic-accordion>
      </tonic-tab-panel>
      <tonic-tab-panel id="tab-panel-9">Content Three</tonic-tab-panel>
    </component-container>
  </div>
</section>
`)

class ComponentContainer extends Tonic {
  click () {
    this.reRender()
  }

  render () {
    return this.html`
      ${this.childNodes}
    `
  }
}

Tonic.add(ComponentContainer)

tape('{{tabs-3}} has correct default state', t => {
  const container = qs('component-container')

  t.ok(container, 'rendered')
  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],110:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const stream = tape.createStream({ objectMode: true })

const inc = id => {
  const el = document.getElementById(id)
  const count = el.querySelector('.value')

  return () => {
    const val = count.textContent.trim()
    count.textContent = parseInt(val, 10) + 1
  }
}

const incPassing = inc('passing')
const incTotal = inc('total')

const output = document.querySelector('#test-output')

let count = 0
let passed = 0

stream.on('data', data => {
  if (typeof data === 'string') {
    output.innerHTML += `<span class="comment">#${data}</span>`
  }

  if (data.type === 'test') {
    output.innerHTML += `<span class="title"># ${data.name}</span>\n`
    return
  }

  if (data.type === 'assert') {
    ++count
    incTotal()

    const status = data.ok ? 'OK' : 'FAIL'
    output.innerHTML += `<span class="result ${status}">${status} ${data.id} ${data.name}</span>`

    if (!data.ok) {
      console.error(data)
      return
    }

    ++passed
    incPassing()
    return
  }

  if (data.type === 'end') {
    const ok = passed === count ? 'OK' : 'FAIL'

    const status = document.getElementById('status')
    const value = status.querySelector('.value')

    if (!status.classList.contains('fail')) {
      value.textContent = ok
    }

    if (!ok) {
      status.classList.add('fail')
    }

    output.innerHTML += `\n<span class="${ok}"># ${ok ? 'ok' : 'not ok'}</span>`
  }
})

module.exports = tape

},{"@pre-bundled/tape":51}],111:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')
const components = require('../..')

require('./tape.js')

components(Tonic)

function ready () {
  require('../../router/test')
  require('../../panel/test')
  require('../../dialog/test')
  require('../../tabs/test')
  require('../../windowed/test')
  require('../../tooltip/test')
  require('../../popover/test')
  require('../../badge/test')
  require('../../button/test')
  require('../../chart/test')
  require('../../checkbox/test')
  require('../../icon/test')
  require('../../input/test')
  require('../../progress-bar/test')
  require('../../profile-image/test')
  require('../../range/test')
  require('../../select/test')
  require('../../textarea/test')
  require('../../toaster/test')
  require('../../toaster-inline/test')
  require('../../toggle/test')

  document.addEventListener('keydown', e => {
    if (e.keyCode === 9) {
      document.body.classList.add('show-focus')
    }
  })

  document.addEventListener('click', e => {
    document.body.classList.remove('show-focus')
  })
}

document.addEventListener('DOMContentLoaded', ready)

},{"../..":46,"../../badge/test":34,"../../button/test":36,"../../chart/test":38,"../../checkbox/test":40,"../../dialog/test":42,"../../icon/test":45,"../../input/test":48,"../../panel/test":93,"../../popover/test":95,"../../profile-image/test":97,"../../progress-bar/test":99,"../../range/test":101,"../../router/test":104,"../../select/test":106,"../../tabs/test":109,"../../textarea/test":114,"../../toaster-inline/test":116,"../../toaster/test":118,"../../toggle/test":120,"../../tooltip/test":122,"../../windowed/test":123,"./tape.js":110,"@optoolco/tonic":49}],112:[function(require,module,exports){
'use strict'

const Tonic = require('@optoolco/tonic')

class MainComp extends Tonic {
  constructor (str, strings, values) {
    super()

    this.str = str
    this.strings = strings
    this.values = values
  }

  render () {
    return this.html(
      [this.str, ...this.strings], ...this.values
    )
  }
}
Tonic.add(MainComp, 'test-main-comp')

exports.html = html

function html ([str, ...strings], ...values) {
  const comp = new MainComp(str, strings, values)
  return comp
}

},{"@optoolco/tonic":49}],113:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicTextarea extends Tonic {
  defaults () {
    return {
      placeholder: '',
      spellcheck: true,
      disabled: false,
      required: false,
      readonly: false,
      autofocus: false,
      width: '100%',
      radius: '2px'
    }
  }

  static stylesheet () {
    return `
      tonic-textarea textarea {
        color: var(--tonic-primary, #333);
        width: 100%;
        font: 14px var(--tonic-monospace, 'Andale Mono', monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--tonic-border, #ccc);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      tonic-textarea textarea:focus {
        border: 1px solid var(--tonic-primary, #333);
      }

      tonic-textarea textarea:invalid {
        border-color: var(--tonic-danger, #f66);
      }

      tonic-textarea textarea[disabled] {
        background-color: var(--tonic-background, #fff);
      }

      tonic-textarea label {
        color: var(--tonic-medium, #999);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader,  'Arial', sans-serif);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }
    `
  }

  styles () {
    const {
      width,
      radius,
      resize
    } = this.props

    return {
      textarea: {
        width,
        borderRadius: radius,
        resize: resize
      }
    }
  }

  get value () {
    return this.querySelector('textarea').value
  }

  set value (value) {
    this.querySelector('textarea').value = value
  }

  renderLabel () {
    if (typeof this.props.label === 'undefined') return ''
    return this.html`
      <label
        for="tonic--textarea_${this.props.id}"
      >${this.props.label}</label>
    `
  }

  willConnect () {
    const {
      value
    } = this.props

    this.props.value = typeof value === 'undefined' ? this.textContent : value
  }

  render () {
    const {
      ariaLabelledby,
      autofocus,
      cols,
      height,
      disabled,
      label,
      maxlength,
      minlength,
      name,
      placeholder,
      readonly,
      required,
      rows,
      spellcheck,
      tabindex,
      theme,
      width
    } = this.props

    if (ariaLabelledby) this.removeAttribute('ariaLabelled')
    if (width) this.style.width = width
    if (height) this.style.height = height
    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)
    if (name) this.removeAttribute('name')

    if (this.props.value === 'undefined') this.props.value = ''

    return this.html`
      <div class="tonic--wrapper">
        ${this.renderLabel()}
        <textarea ... ${{
          styles: 'textarea',
          id: `tonic--textarea_${this.props.id}`,
          'aria-label': label,
          'aria-labelledby': ariaLabelledby,
          cols,
          disabled: disabled === 'true',
          maxlength,
          minlength,
          name,
          placeholder,
          rows,
          spellcheck,
          tabindex,
          autofocus,
          required,
          readonly
        }}>${this.props.value}</textarea>
      </div>
    `
  }
}

module.exports = { TonicTextarea }

},{"@optoolco/tonic":49}],114:[function(require,module,exports){
const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="textarea">
  <h2>Textarea</h2>

  <div class="test-container">
    <span>Default Textarea</span>
    <tonic-textarea id="text-area-1"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>With Content</span>
    <tonic-textarea id="text-area-2">It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.</tonic-textarea>
  </div>

  <div class="test-container">
    <span>id="textarea-id"</span>
    <tonic-textarea id="textarea-id"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>name="textarea-name"</span>
    <tonic-textarea id="text-area-3" name="textarea-name"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>placeholder="This is a placeholder"</span>
    <tonic-textarea id="text-area-4" placeholder="This is a placeholder"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>resize="none"</span>
    <tonic-textarea id="text-area-5" resize="none"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>spellcheck="true"</span>
    <tonic-textarea id="text-area-6" spellcheck="true">fdsfds</tonic-textarea>
  </div>

  <div class="test-container">
    <span>spellcheck="false"</span>
    <tonic-textarea id="text-area-7" spellcheck="false">fdsfds</tonic-textarea>
  </div>

  <div class="test-container">
    <span>disabled="true"</span>
    <tonic-textarea id="text-area-8" disabled="true"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>disabled="false"</span>
    <tonic-textarea id="text-area-9" disabled="false"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>required="true"</span>
    <tonic-textarea id="text-area-10" required="true"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>required="false"</span>
    <tonic-textarea id="text-area-11" required="false"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>readonly="true"</span>
    <tonic-textarea id="text-area-12" readonly="true"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>readonly="false"</span>
    <tonic-textarea id="text-area-13" readonly="false"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>autofocus="true"</span>
    <tonic-textarea id="text-area-14" autofocus="true"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>autofocus="false"</span>
    <tonic-textarea id="text-area-15" autofocus="false"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>rows="10"</span>
    <tonic-textarea id="text-area-16" rows="10"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>cols="10"</span>
    <tonic-textarea id="text-area-17" cols="10"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>minlength="10"</span>
    <tonic-textarea id="text-area-18" minlength="10"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>maxlength="100"</span>
    <tonic-textarea id="text-area-19" maxlength="100"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>width="100%"</span>
    <tonic-textarea id="text-area-20" width="100%"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>width="200px"</span>
    <tonic-textarea id="text-area-21" width="100%"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>height="300px"</span>
    <tonic-textarea id="text-area-22" height="300px"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>radius="10px"</span>
    <tonic-textarea id="text-area-23" radius="10px"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>theme="light"</span>
    <tonic-textarea id="text-area-24" theme="light"></tonic-textarea>
  </div>

  <div class="test-container flex-half dark">
    <span>theme="dark"</span>
    <tonic-textarea id="text-area-25" theme="dark"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>label="Foo Bar Bazz"</span>
    <tonic-textarea id="text-area-26" label="Foo Bar Bazz"></tonic-textarea>
  </div>

  <div class="test-container">
    <span>autofocus="true"</span>
    <tonic-textarea id="text-area-27" autofocus="true"></tonic-textarea>
  </div>

</section>
`)

// TODO: write tests

},{"..":46,"../test/util":112,"@optoolco/tonic":49}],115:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicToasterInline extends Tonic {
  defaults () {
    return {
      display: 'true'
    }
  }

  static stylesheet () {
    return `
      tonic-toaster-inline > div > .tonic--close svg,
      tonic-toaster-inline > div > .tonic--icon svg {
        width: inherit;
        height: inherit;
      }

      tonic-toaster-inline .tonic--notification {
        max-height: 0;
        position: relative;
        background-color: var(--tonic-window, #fff);
        border: 1px solid var(--tonic-border, #ccc);
        border-radius: 3px;
        -webkit-transform: scale(0.95);
        -ms-transform: scale(0.95);
        transform: scale(0.95);
        transition: opacity 0.2s ease-in-out 0s, transform 0.3s ease-in-out 0s, max-height 0.3s ease-in-out;
        opacity: 0;
        z-index: -1;
      }

      tonic-toaster-inline .tonic--notification.tonic--show {
        max-height: 100%;
        margin: 10px 0;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out, max-height 0.3s ease-in-out;
        opacity: 1;
        z-index: 1;
      }

      tonic-toaster-inline .tonic--notification.tonic--close {
        padding-right: 50px;
      }

      tonic-toaster-inline .tonic--notification.tonic--alert {
        padding-left: 35px;
      }

      tonic-toaster-inline .tonic--main {
        padding: 17px 18px 15px 18px;
      }

      tonic-toaster-inline.tonic--dismiss .tonic--main {
        margin-right: 40px;
      }

      tonic-toaster-inline .tonic--title {
        color: var(--tonic-primary, #333);
        font: 14px/18px var(--tonic-subheader, 'Arial', sans-serif);
      }

      tonic-toaster-inline .tonic--message {
        font: 14px/18px var(--tonic-subheader, 'Arial', sans-serif);
        color: var(--tonic-medium, #999);
      }

      tonic-toaster-inline .tonic--notification .tonic--icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      tonic-toaster-inline .tonic--close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
      }
    `
  }

  show () {
    const node = this.querySelector('.tonic--notification')
    node.classList.add('tonic--show')
  }

  hide () {
    const node = this.querySelector('.tonic--notification')
    node.classList.remove('tonic--show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.tonic--close')
    if (!el) return

    this.hide()
  }

  connected () {
    this.updated()
  }

  updated () {
    const {
      display,
      duration
    } = this.props

    if (display === 'true') {
      window.requestAnimationFrame(() => this.show())
    }

    if (duration) {
      setTimeout(() => this.hide(), duration)
    }
  }

  renderClose () {
    if (this.props.dismiss !== 'true') {
      return ''
    }

    this.classList.add('tonic--dismiss')

    return this.html`
      <div class="tonic--close">
        <svg>
          <use
            href="#close"
            xlink:href="#close"
            color="var(--tonic-primary, #333)"
            fill="var(--tonic-primary, #333)">
          </use>
        </svg>
      </div>
    `
  }

  renderIcon () {
    const type = this.props.type

    if (!type) return ''

    return this.html`
      <div class="tonic--icon">
        <svg>
          <use
            href="#${type}"
            xlink:href="#${type}"
            color="var(--tonic-${type}, #f66)"
            fill="var(--tonic-${type}, #f66)">
          </use>
        </svg>
      </div>
    `
  }

  styles () {
    return {
      type: {
        'border-color': `var(--tonic-${this.props.type}, #f66)`
      }
    }
  }

  render () {
    const {
      title,
      type,
      message,
      theme
    } = this.props

    if (theme) {
      this.setAttribute('theme', theme)
    }

    const classes = ['tonic--notification']

    if (type) {
      classes.push('tonic--alert', `tonic--${type}`)
    }

    return this.html`
      <div ... ${{
        class: classes.join(' '),
        styles: type ? 'type' : ''
      }}>
        ${this.renderIcon()}
        ${this.renderClose()}
        <div class="tonic--main">
          <div class="tonic--title">
            ${title}
          </div>
          <div class="tonic--message">
            ${message || this.childNodes}
          </div>
        </div>
      </div>
    `
  }
}

module.exports = { TonicToasterInline }

},{"@optoolco/tonic":49}],116:[function(require,module,exports){

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="toaster-inline">
  <h2>ToasterInline</h2>

  <!-- Default inline toaster -->
  <div id="inline-toaster-1" class="test-container">
    <span>Default Inline Toaster</span>
    <tonic-toaster-inline
      id="tonic-toasterinline-default">
      Message
    </tonic-toaster-inline>
  </div>

  <!-- Toaster inline displayed initially -->
  <div id="inline-toaster-2" class="test-container">
    <span>Toaster inline displayed initially</span>
    <div>
      <tonic-toaster-inline
        display="true"
        id="tonic-toasterinline-initial">
        Displayed initially.</tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ title -->
  <div id="inline-toaster-5" class="test-container">
    <span>Toaster inline w/ title</span>
    <div>
      <tonic-toaster-inline
        id="tonic-toasterinline-title">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ inline HTML title -->
  <div id="inline-toaster-6" class="test-container">
    <span>Toaster inline w/ inline HTML title</span>
    <div>
      <tonic-toaster-inline
        title="I am a title!"
        id="tonic-toasterinline-inline-title"></tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ message -->
  <div id="inline-toaster-7" class="test-container">
    <span>Toaster inline w/ message</span>
    <div>
      <tonic-toaster-inline
        id="tonic-toasterinline-message">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ message (initial) -->
  <div id="inline-toaster-8" class="test-container">
    <span>Toaster inline w/ message (initial)</span>
    <div>
      <tonic-toaster-inline
        display="true"
        message="I am a message!"
        id="tonic-toasterinline-message-2">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ title & message -->
  <div id="inline-toaster-9" class="test-container">
    <span>Toaster inline w/ title & message</span>
    <div>
      <tonic-toaster-inline
        id="tonic-toasterinline-title-message">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ innerHTML message (must be initial)-->
  <div id="inline-toaster-10" class="test-container">
    <span>Toaster inline w/ innerHTML message (must be initial)</span>
    <div>
      <tonic-toaster-inline
        display="true"
        id="tonic-toasterinline-innerHTML-message">
        This is your message.
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ type success -->
  <div id="inline-toaster-11" class="test-container">
    <span>Toaster inline w/ type success</span>
    <div>
      <tonic-toaster-inline
        type="success"
        id="tonic-toasterinline-type-success">
        It's a success
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ type warning -->
  <div id="inline-toaster-12" class="test-container">
    <span>Toaster inline w/ type warning</span>
    <div>
      <tonic-toaster-inline
        type="warning"
        id="tonic-toasterinline-type-warning">
        You've been warned.
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ type danger -->
  <div id="inline-toaster-13" class="test-container">
    <span>Toaster inline w/ type danger</span>
    <div>
      <tonic-toaster-inline
        type="danger"
        id="tonic-toasterinline-type-danger">
        Watch out!
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ type info -->
  <div id="inline-toaster-14" class="test-container">
    <span>Toaster inline w/ type info</span>
    <div>
      <tonic-toaster-inline
        type="info"
        id="tonic-toasterinline-type-info">
        For your information
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ type & title -->
  <div id="inline-toaster-15" class="test-container">
    <span>Toaster inline w/ type & title</span>
    <div>
      <tonic-toaster-inline id="tonic-toasterinline-type-title">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ type & message -->
  <div id="inline-toaster-16" class="test-container">
    <span>Toaster inline w/ type & message</span>
    <div>
      <tonic-toaster-inline id="tonic-toasterinline-type-message">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ type & title & message -->
  <div id="inline-toaster-17" class="test-container">
    <span>Toaster inline w/ type & title & message</span>
    <div>
      <tonic-toaster-inline id="tonic-toasterinline-type-title-message">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ duration -->
  <div id="inline-toaster-18" class="test-container">
    <span>Toaster inline w/ duration</span>
    <div>
      <tonic-toaster-inline id="tonic-toasterinline-duration">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/out duration -->
  <div id="inline-toaster-19" class="test-container">
    <span>Toaster inline w/out duration</span>
    <div>
      <tonic-toaster-inline id="tonic-toasterinline-no-duration">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/ dismiss w/ duration -->
  <div id="inline-toaster-20" class="test-container">
    <span>Toaster inline w/ dismiss w/ duration</span>
    <div>
      <tonic-toaster-inline
        id="tonic-toasterinline-dismiss-duration"
        dismiss="true"
        message="Dismiss me or I will disappear!">
      </tonic-toaster-inline>
    </div>
  </div>

  <!-- Inline toaster w/out dismiss w/ duration -->
  <div id="inline-toaster-21" class="test-container">
    <span>Toaster inline w/out dismiss w/ duration</span>
    <div>
      <tonic-toaster-inline id="tonic-toasterinline-no-dismiss-duration">
        Message
      </tonic-toaster-inline>
    </div>
  </div>

</section>
`)

},{"..":46,"../test/util":112,"@optoolco/tonic":49}],117:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicToaster extends Tonic {
  defaults () {
    return {
      position: 'center'
    }
  }

  static stylesheet () {
    return `
      tonic-toaster * {
        box-sizing: border-box;
      }

      tonic-toaster svg {
        width: inherit;
        height: inherit;
      }

      tonic-toaster .tonic--wrapper {
        user-select: none;
        position: fixed;
        top: 10px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        visibility: hidden;
        z-index: 102;
      }

      @media (max-width: 850px) tonic-toaster .tonic--wrapper {
        width: 90%;
      }

      tonic-toaster .tonic--wrapper.tonic--show {
        visibility: visible;
      }

      tonic-toaster .tonic--wrapper.tonic--center {
        left: 50%;
        align-items: center;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
      }

      tonic-toaster .tonic--wrapper.tonic--left {
        align-items: flex-start;
        left: 10px;
      }

      tonic-toaster .tonic--wrapper.tonic--right {
        align-items: flex-end;
        right: 10px;
      }

      tonic-toaster .tonic--notification {
        width: auto;
        max-width: 600px;
        margin-top: 10px;
        position: relative;
        background-color: var(--tonic-window);
        box-shadow: 0px 10px 40px -20px rgba(0,0,0,0.4), 0 0 1px #a2a9b1;
        border-radius: 3px;
        -webkit-transform: translateY(-100px);
        -ms-transform: translateY(-100px);
        transform: translateY(-100px);
        transition: opacity 0.2s ease, transform 0s ease 1s;
        z-index: 1;
        opacity: 0;
      }

      tonic-toaster .tonic--notification.tonic--show {
        opacity: 1;
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
        transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
      }

      tonic-toaster .tonic--notification.tonic--close {
        padding-right: 50px;
      }

      tonic-toaster .tonic--notification.tonic--alert {
        padding-left: 35px;
      }

      tonic-toaster .tonic--main {
        padding: 17px 15px 15px 15px;
      }

      tonic-toaster .tonic--title {
        color: var(--tonic-primary);
        font: 14px/18px var(--tonic-subheader);
      }

      tonic-toaster .tonic--message {
        color: var(--tonic-medium);
        font: 14px/18px var(--tonic-body);
      }

      tonic-toaster .tonic--notification .tonic--icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      tonic-toaster .tonic--notification .tonic--close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
      }
    `
  }

  create ({ message, title, duration, type, dismiss } = {}) {
    const notification = document.createElement('div')
    notification.className = 'tonic--notification'

    const main = document.createElement('div')
    main.className = 'tonic--main'

    if (type) {
      notification.dataset.type = type
      notification.classList.add('tonic--alert')
    }

    const titleElement = document.createElement('div')
    titleElement.className = 'tonic--title'
    titleElement.textContent = title || this.props.title

    const messageElement = document.createElement('div')
    messageElement.className = 'tonic--message'
    messageElement.textContent = message || this.props.message

    if (typeof dismiss === 'string') {
      dismiss = dismiss === 'true'
    }

    if (dismiss !== false) {
      const closeIcon = document.createElement('div')
      closeIcon.className = 'tonic--close'
      notification.appendChild(closeIcon)
      notification.classList.add('tonic--close')

      const svgns = 'http://www.w3.org/2000/svg'
      const xlinkns = 'http://www.w3.org/1999/xlink'
      const svg = document.createElementNS(svgns, 'svg')
      const use = document.createElementNS(svgns, 'use')

      closeIcon.appendChild(svg)
      svg.appendChild(use)

      use.setAttributeNS(xlinkns, 'href', '#close')
      use.setAttributeNS(xlinkns, 'xlink:href', '#close')
      use.setAttribute('color', 'var(--tonic-primary)')
      use.setAttribute('fill', 'var(--tonic-primary)')
    }

    if (type) {
      const alertIcon = document.createElement('div')
      alertIcon.className = 'tonic--icon'
      notification.appendChild(alertIcon)

      const svgns = 'http://www.w3.org/2000/svg'
      const xlinkns = 'http://www.w3.org/1999/xlink'
      const svg = document.createElementNS(svgns, 'svg')
      const use = document.createElementNS(svgns, 'use')

      alertIcon.appendChild(svg)
      svg.appendChild(use)

      use.setAttributeNS(xlinkns, 'href', `#${type}`)
      use.setAttributeNS(xlinkns, 'xlink:href', `#${type}`)
      use.setAttribute('color', `var(--tonic-${type})`)
      use.setAttribute('fill', `var(--tonic-${type})`)
    }

    notification.appendChild(main)
    main.appendChild(titleElement)
    main.appendChild(messageElement)
    this.querySelector('.tonic--wrapper').appendChild(notification)
    this.show()

    setTimeout(() => {
      if (!notification) return
      notification.classList.add('tonic--show')
    }, 64)

    if (duration) {
      setTimeout(() => {
        if (!notification) return
        this.destroy(notification)
      }, duration)
    }
  }

  destroy (el) {
    el.classList.remove('tonic--show')
    el.addEventListener('transitionend', e => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    })
  }

  show () {
    const node = this.querySelector('.tonic--wrapper')
    node.classList.add('tonic--show')
  }

  hide () {
    const node = this.querySelector('.tonic--wrapper')
    node.classList.remove('tonic--show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.tonic--close')
    if (!el) return

    const notification = el.closest('.tonic--notification')
    if (notification) this.destroy(notification)
  }

  render () {
    const {
      theme,
      position
    } = this.props

    if (theme) this.classList.add(`tonic--theme--${theme}`)

    const classes = ['tonic--wrapper']
    if (position) classes.push(`tonic--${position}`)

    return this.html`
      <div class="${classes.join(' ')}">
      </div>
    `
  }
}

module.exports = { TonicToaster }

},{"@optoolco/tonic":49}],118:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="toaster">
  <h2>Toaster</h2>

  <tonic-toaster position="center"></tonic-toaster>
  <tonic-toaster position="left"></tonic-toaster>
  <tonic-toaster position="right"></tonic-toaster>
  <tonic-toaster theme="light"></tonic-toaster>
  <tonic-toaster theme="dark"></tonic-toaster>

  <div id="toaster-2" class="test-container">
    <span>Toaster w/ Type Success</span>
    <tonic-button id="tonic-toaster-type-success">
      Success
    </tonic-button>
  </div>

  <div id="toaster-3" class="test-container">
    <span>Toaster w/ Type warning</span>
    <tonic-button id="tonic-toaster-type-warning">
      Warning
    </tonic-button>
  </div>

  <div id="toaster-4" class="test-container">
    <span>Toaster w/ Type danger</span>
    <tonic-button id="tonic-toaster-type-danger">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ type info -->
  <div class="test-container">
    <span>Toaster w/ Type info</span>
    <tonic-button id="tonic-toaster-type-info">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ title -->
  <div class="test-container">
    <span>Toaster w/ Title</span>
    <tonic-button id="tonic-toaster-title">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ message -->
  <div class="test-container">
    <span>Toaster w/ Message</span>
    <tonic-button id="tonic-toaster-message">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ title and message -->
  <div class="test-container">
    <span>Toaster w/ Title & Message</span>
    <tonic-button id="tonic-toaster-title-message">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ title and message and type -->
  <div class="test-container">
    <span>Toaster w/ Type, Title & Message</span>
    <tonic-button id="tonic-toaster-type-title-message">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ dismiss -->
  <div class="test-container">
    <span>Toaster w/ dismiss</span>
    <tonic-button id="tonic-toaster-dismiss">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/out dismiss -->
  <div class="test-container">
    <span>Toaster w/out dismiss</span>
    <tonic-button id="tonic-toaster-dismiss-false">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ dismiss w/ duration -->
  <div class="test-container">
    <span>Toaster w/ dismiss w/ duration</span>
    <tonic-button id="tonic-toaster-dismiss-duration">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/out dismiss w/ duration -->
  <div class="test-container">
    <span>Toaster w/out dismiss w/ duration</span>
    <tonic-button id="tonic-toaster-dismiss-false-duration">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ left position -->
  <div class="test-container">
    <span>Toaster w/ left position</span>
    <tonic-button id="tonic-toaster-position-left">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ right position -->
  <div class="test-container">
    <span>Toaster w/ right position</span>
    <tonic-button id="tonic-toaster-position-right">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ theme light -->
  <div class="test-container">
    <span>Toaster w/ theme light</span>
    <tonic-button id="tonic-toaster-theme-light" theme="light">
      Toast
    </tonic-button>
  </div>

  <!-- Toaster w/ theme dark -->
  <div class="test-container flex-half dark">
    <span>Toaster w/ theme dark</span>
    <tonic-button id="tonic-toaster-theme-dark" theme="dark">
      Toast
    </tonic-button>
  </div>

</section>
`)

const notification = qs('tonic-toaster[position="center"]')
const sleep = n => new Promise(resolve => setTimeout(resolve, n))

tape('{{toaster}} is created and destroyed', async t => {
  notification.create({
    message: 'You have been notified.'
  })

  await sleep(512)

  const toaster = qs('.tonic--notification', notification)
  const toasterMain = qs('.tonic--main', toaster)
  const toasterMessage = qs('.tonic--message', toasterMain)
  const toasterTitle = qs('.tonic--title', toasterMain)
  const dismiss = toaster.classList.contains('tonic--close')
  const closeIcon = qs('.tonic--close', toaster)

  t.plan(6)

  t.ok(toaster, 'Toaster was created')
  t.ok(toasterMain, 'Toaster main div was created')
  t.ok(toasterMessage, 'Toaster message div was created')
  t.ok(toasterTitle, 'Toaster title div was created')

  t.equal(!dismiss, !closeIcon, 'Only if toaster has dismiss class, is close icon also created')

  notification.destroy(toaster)

  await sleep(512)

  const toasterB = qs('.tonic--notification', notification)
  t.ok(!toasterB, 'Toaster was destroyed')

  t.end()
})

tape('{{toaster}} with dismiss false is created without close icon', async t => {
  notification.create({
    message: 'I will stay open',
    dismiss: 'false'
  })

  await sleep(512)

  const toaster = qs('.tonic--notification', notification)
  const dismiss = toaster.classList.contains('tonic--close')
  const closeIcon = qs('.tonic--close', toaster)

  t.equal(!dismiss, !closeIcon, 'Only if toaster has dismiss class, is close icon also created')

  notification.destroy(toaster)
  t.end()
})

tape('{{toaster}} with type success is created', async t => {
  notification.create({
    type: 'success',
    message: 'Success!'
  })

  await sleep(512)

  const toaster = qs('.tonic--notification', notification)
  const toasterMessage = qs('.tonic--message', toaster)

  const alert = toaster.classList.contains('tonic--alert')
  const alertIcon = qs('.tonic--icon', toaster)

  t.ok(toaster, 'Toaster was created')
  t.equal(toasterMessage.textContent, 'Success!', 'Toaster textContent matches message')
  t.equal(!alert, !alertIcon, 'If toaster does not have alert class, alert icon is not created')

  notification.destroy(toaster)
  t.end()
})

tape('{{toaster}} is created and destroyed after duration', async t => {
  notification.create({
    message: 'Short and sweet',
    duration: 512
  })

  await sleep(128)

  const toaster = qs('.tonic--notification', notification)
  t.ok(toaster, 'Toaster was created')

  await sleep(1024)

  const toasterB = qs('.tonic--notification', notification)
  t.ok(!toasterB, 'Toaster was destroyed')

  t.end()
})

tape('{{toaster}} is created on the left', async t => {
  const notificationLeft = qs('tonic-toaster[position="left"]')
  const wrapper = qs('.tonic--left', notificationLeft)

  notificationLeft.create({
    message: 'Left toaster',
    duration: 3e3
  })

  await sleep(128)

  const toaster = qs('.tonic--notification', wrapper)

  t.ok(wrapper, 'Wrapper was created with the tonic--left class')
  t.ok(toaster, 'Toaster was created')

  t.end()
})

tape('{{toaster}} is created on the right', async t => {
  const notificationRight = qs('tonic-toaster[position="right"]')
  const wrapper = qs('.tonic--right', notificationRight)

  notificationRight.create({
    message: 'Right toaster',
    duration: 3e3
  })

  await sleep(128)

  const toaster = qs('.tonic--notification', wrapper)

  t.ok(wrapper, 'Wrapper was created with the tonic--right class')
  t.ok(toaster, 'Toaster was created')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],119:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicToggle extends Tonic {
  defaults () {
    return {
      checked: false
    }
  }

  get value () {
    const state = this.state
    let value

    if (typeof state.checked !== 'undefined') {
      value = state.checked
    } else {
      value = this.props.checked
    }

    return (value === true) || (value === 'true')
  }

  set value (value) {
    const checked = (value === true) || (value === 'true')
    this.state.checked = checked

    this.reRender(props => Object.assign(props, {
      checked
    }))
  }

  static stylesheet () {
    return `
      tonic-toggle .tonic--toggle--wrapper {
        height: 30px;
        position: relative;
      }

      tonic-toggle .tonic--toggle--wrapper > label {
        color: var(--tonic-medium, #999);
        font-weight: 500;
        font: 12px/14px var(--tonic-subheader, 'Arial', sans-serif);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-left: 58px;
        padding-top: 6px;
        display: block;
        user-select: none;
      }

      tonic-toggle .tonic--switch {
        position: absolute;
        left: 0;
        top: 0;
      }

      tonic-toggle .tonic--switch label:before {
        font: bold 12px var(--tonic-subheader, 'Arial', sans-serif);
        text-transform: uppercase;
      }

      tonic-toggle .tonic--toggle {
        position: absolute;
        opacity: 0;
        outline: none;
        user-select: none;
        z-index: 1;
      }

      tonic-toggle .tonic--toggle + label {
        width: 42px;
        height: 24px;
        padding: 2px;
        display: block;
        position: relative;
        background-color: var(--tonic-border, #ccc);
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        cursor: default;
      }

      tonic-toggle .tonic--toggle:focus + label {
        outline: -webkit-focus-ring-color auto 5px;
      }

      tonic-toggle .tonic--toggle + label:before {
        content: '';
        line-height: 29px;
        text-indent: 29px;
        position: absolute;
        top: 1px;
        left: 1px;
        right: 1px;
        bottom: 1px;
        display: block;
        border-radius: 60px;
        transition: background 0.4s ease-in-out;
        padding-top: 1px;
        font-size: 0.65em;
        letter-spacing: 0.05em;
        background-color: var(--tonic-border, #ccc);
      }

      tonic-toggle .tonic--toggle + label:after {
        content: '';
        width: 16px;
        position: absolute;
        top: 4px;
        left: 4px;
        bottom: 4px;
        background-color: var(--tonic-window, #fff);
        border-radius: 52px;
        transition: background 0.4s ease-in-out, margin 0.4s ease-in-out;
        display: block;
        z-index: 2;
      }

      tonic-toggle .tonic--toggle:disabled {
        cursor: default;
      }

      tonic-toggle .tonic--toggle:disabled + label {
        cursor: default;
        opacity: 0.5;
      }

      tonic-toggle .tonic--toggle:disabled + label:before {
        content: '';
        opacity: 0.5;
      }

      tonic-toggle .tonic--toggle:disabled + label:after {
        background-color: var(--tonic-window, #fff);
      }

      tonic-toggle .tonic--toggle:checked + label {
        background-color: var(--tonic-accent, #f66);
      }

      tonic-toggle .tonic--toggle:checked + label:before {
        background-color: var(--tonic-accent, #f66);
        color: var(--tonic-background);
      }

      tonic-toggle .tonic--toggle:checked + label:after {
        margin-left: 18px;
        background-color: var(--tonic-background, #fff);
      }
    `
  }

  change (e) {
    this.state.checked = e.target.checked
  }

  renderLabel () {
    const {
      id,
      label
    } = this.props

    if (!label) return ''

    return this.html`<label for="tonic--toggle--${id}">${label}</label>`
  }

  render () {
    const {
      id,
      disabled,
      theme,
      tabindex
    } = this.props

    if (tabindex) this.removeAttribute('tabindex')
    if (theme) this.classList.add(`tonic--theme--${theme}`)

    let checked
    if (typeof this.state.checked !== 'undefined') {
      checked = this.state.checked
    } else {
      checked = this.props.checked === 'true'
    }
    this.state.checked = checked

    return this.html`
      <div class="tonic--toggle--wrapper">
        <div class="tonic--switch">
          <input ... ${{
            type: 'checkbox',
            class: 'tonic--toggle',
            id: `tonic--toggle--${id}`,
            disabled: disabled === 'true',
            tabindex,
            checked
          }}/>
          <label for="tonic--toggle--${id}"></label>
        </div>
        ${this.renderLabel()}
      </div>
    `
  }
}

module.exports = { TonicToggle }

},{"@optoolco/tonic":49}],120:[function(require,module,exports){
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="toggle">
  <h2>Toggle</h2>

  <div id="toggle-1" class="test-container">
    <span>Default Toggle</span>
    <tonic-toggle id="toggle-default"></tonic-toggle>
  </div>

  <div id="toggle-2" class="test-container">
    <span>tab-index="0"</span>
    <tonic-toggle id="toggle-tabindex" tabindex="0"></tonic-toggle>
  </div>

  <div id="toggle-3" class="test-container">
    <span>label="label"</span>
    <tonic-toggle label="label" id="toggle-label"></tonic-toggle>
  </div>

  <div class="test-container">
    <span>label="label"</span>
    <tonic-toggle id="toggle-2" label="label"></tonic-toggle>
  </div>

  <div class="test-container">
    <span>id="toggle-3"</span>
    <tonic-toggle id="toggle-3"></tonic-toggle>
  </div>

  <div class="test-container">
    <span>name="toggle-name"</span>
    <tonic-toggle id="toggle-4" name="toggle-name"></tonic-toggle>
  </div>

  <div class="test-container">
    <span>disabled="true"</span>
    <tonic-toggle id="toggle-5" disabled="true"></tonic-toggle>
  </div>

  <div class="test-container">
    <span>disabled="false"</span>
    <tonic-toggle id="toggle-6" disabled="false"></tonic-toggle>
  </div>

  <div class="test-container">
    <span>checked="true"</span>
    <tonic-toggle id="toggle-7" checked="true"></tonic-toggle>
  </div>

  <div class="test-container">
    <span>checked="false"</span>
    <tonic-toggle id="toggle-8" checked="false"></tonic-toggle>
  </div>

  <div class="test-container">
    <span>checked="true", disabled="true"</span>
    <tonic-toggle id="toggle-9" checked="true" disabled="true"></tonic-toggle>
  </div>

  <div class="test-container">
    <span>theme="light"</span>
    <tonic-toggle id="toggle-10" theme="light"></tonic-toggle>
  </div>

  <div class="test-container flex-half dark">
    <span>theme="dark"</span>
    <tonic-toggle id="toggle-11" theme="dark"></tonic-toggle>
  </div>

  <div class="test-container flex-half dark">
    <span>theme="dark", disabled="true"</span>
    <tonic-toggle id="toggle-12" theme="dark" disabled="true"></tonic-toggle>
  </div>

  <div class="test-container flex-half dark">
    <span>theme="dark", checked="true", disabled="true"</span>
    <tonic-toggle id="toggle-13" theme="dark" checked="true" disabled="true"></tonic-toggle>
  </div>

</section>
`)

tape('{{toggle-1}} default state renders properly', t => {
  const container = qs('#toggle-1')
  const component = qs('tonic-toggle', container)
  const toggleWrapper = qs('.tonic--switch', component)
  const input = qs('input', toggleWrapper)
  const label = qs('label', toggleWrapper)

  t.plan(4)

  t.ok(input, 'the component was constructed with an input')
  t.ok(toggleWrapper, 'the component was constructed with a toggle wrapper')
  t.ok(component.hasAttribute('id'), 'the component has an id')
  t.equal(input.getAttribute('id'), label.getAttribute('for'), 'the input id matches the label')

  t.end()
})

tape('{{toggle-2}} has tabindex attribute', t => {
  const container = qs('#toggle-2')
  const component = qs('tonic-toggle', container)
  const toggleWrapper = qs('.tonic--switch', component)
  const input = qs('input', toggleWrapper)

  t.plan(3)

  t.ok(input, 'the component was constructed with an input')
  t.equal(component.hasAttribute('tabindex'), false, 'component does not have a tabindex')
  t.equal(input.hasAttribute('tabindex'), true, 'input has a tabindex')

  t.end()
})

},{"..":46,"../test/util":112,"@optoolco/tonic":49,"@pre-bundled/tape":51,"qs":91}],121:[function(require,module,exports){
const Tonic = require('@optoolco/tonic')

class TonicTooltip extends Tonic {
  connected () {
    const target = this.props.for
    const el = document.getElementById(target)
    let timer = null

    const leave = e => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.hide()
      }, 256)
    }

    if (!el) {
      console.warn('Broken tooltip for: ' + target)
      return
    }
    el.addEventListener('mouseenter', e => {
      this.show(el)
    })

    this.addEventListener('mouseenter', e => clearTimeout(timer))
    this.addEventListener('mouseleave', leave)
    el.addEventListener('mouseleave', leave)
  }

  defaults (props) {
    return {
      width: 'auto',
      height: 'auto'
    }
  }

  static stylesheet () {
    return `
      tonic-tooltip .tonic--tooltip {
        color: var(--tonic-primary, #333);
        position: fixed;
        background: var(--tonic-window, #fff);
        visibility: hidden;
        z-index: -1;
        opacity: 0;
        border: 1px solid var(--tonic-border, #ccc);
        border-radius: 2px;
        transition: visibility 0.2s ease-in-out, opacity 0.2s ease-in-out, z-index 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      }

      tonic-tooltip .tonic--tooltip.tonic--show {
        visibility: visible;
        opacity: 1;
        z-index: 1;
        box-shadow: 0px 30px 90px -20px rgba(0, 0, 0, 0.3);
      }

      tonic-tooltip .tonic--tooltip .tonic--tooltip-arrow {
        width: 12px;
        height: 12px;
        position: absolute;
        z-index: -1;
        background-color: var(--tonic-window, #fff);
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        left: 50%;
      }

      tonic-tooltip .tonic--tooltip .tonic--tooltip-arrow {
        border: 1px solid transparent;
        border-radius: 2px;
        pointer-events: none;
      }

      tonic-tooltip .tonic--top .tonic--tooltip-arrow {
        margin-bottom: -6px;
        bottom: 100%;
        border-top-color: var(--tonic-border, #ccc);
        border-left-color: var(--tonic-border, #ccc);
      }

      tonic-tooltip .tonic--bottom .tonic--tooltip-arrow {
        margin-top: -6px;
        position: absolute;
        top: 100%;
        border-bottom-color: var(--tonic-border, #ccc);
        border-right-color: var(--tonic-border, #ccc);
      }
    `
  }

  show (triggerNode) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const tooltip = this.querySelector('.tonic--tooltip')
      const arrow = this.querySelector('.tonic--tooltip-arrow')

      let { top, left } = triggerNode.getBoundingClientRect()

      left += triggerNode.offsetWidth / 2
      left -= tooltip.offsetWidth / 2

      const offset = triggerNode.offsetHeight + (arrow.offsetHeight / 2)

      if (top < (window.innerHeight / 2)) {
        tooltip.classList.remove('tonic--bottom')
        tooltip.classList.add('tonic--top')
        top += offset
      } else {
        tooltip.classList.remove('tonic--top')
        tooltip.classList.add('tonic--bottom')
        top -= offset + tooltip.offsetHeight
      }

      tooltip.style.top = `${top}px`
      tooltip.style.left = `${left}px`

      window.requestAnimationFrame(() => {
        tooltip.classList.add('tonic--show')
      })

      window.addEventListener('mousewheel', e => {
        this.hide()
      }, { once: true })
    }, 256)
  }

  hide () {
    clearTimeout(this.timer)
    const tooltip = this.querySelector('.tonic--tooltip')
    tooltip.classList.remove('tonic--show')
  }

  styles () {
    const {
      width,
      height
    } = this.props

    return {
      tooltip: {
        width,
        height
      }
    }
  }

  render () {
    if (this.props.theme) {
      this.classList.add(`tonic--theme--${this.props.theme}`)
    }

    return this.html`
      <div class="tonic--tooltip" styles="tooltip">
        ${this.nodes}
        <span class="tonic--tooltip-arrow"></span>
      </div>
    `
  }
}

module.exports = { TonicTooltip }

},{"@optoolco/tonic":49}],122:[function(require,module,exports){
const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

document.body.appendChild(html`
<section id="tooltip">
  <h2>Tooltip</h2>

  <!-- Default tooltip -->
  <div class="test-container">
    <span>Default tooltip</span>
    <span id="tonic-tooltip-default">Hover!</span>
    <tonic-tooltip for="tonic-tooltip-default">
      Hello World
    </tonic-tooltip>
  </div>

  <!-- Default tooltip w/ image -->
  <div class="test-container">
    <span>Default tooltip w/ image</span>
    <span id="tonic-tooltip-image">Hover!</span>
    <tonic-tooltip for="tonic-tooltip-image">
      <img src="/sampleprofile.jpg" width="100px">
    </tonic-tooltip>
  </div>

  <!-- Default tooltip width-->
  <div class="test-container">
    <span>width="400px"</span>
    <span id="tonic-tooltip-width">Hover!</span>
    <tonic-tooltip
      for="tonic-tooltip-width"
      width="400px">
      Hello World
    </tonic-tooltip>
  </div>

  <!-- Default tooltip height -->
  <div class="test-container">
    <span>height="250px"</span>
    <span id="tonic-tooltip-height">Hover!</span>
    <tonic-tooltip
      for="tonic-tooltip-height"
      height="250px">
      Hello World
    </tonic-tooltip>
  </div>

  <!-- Default tooltip theme light -->
  <div class="test-container">
    <span>theme="light"</span>
    <span id="tonic-tooltip-theme-light">Hover!</span>
    <tonic-tooltip
      for="tonic-tooltip-theme-light"
      theme="light">
      I am a light theme!
    </tonic-tooltip>
  </div>

  <!-- Default tooltip theme dark -->
  <div class="test-container">
    <span>theme="dark"</span>
    <span id="tonic-tooltip-theme-dark">Hover!</span>
    <tonic-tooltip
      for="tonic-tooltip-theme-dark"
      theme="dark">
      I am a dark theme!
    </tonic-tooltip>
  </div>

</section>
`)

// TODO write tests

},{"..":46,"../test/util":112,"@optoolco/tonic":49}],123:[function(require,module,exports){
const { html } = require('../test/util')

document.body.appendChild(html`
<section id="windowed">
  <h2>Windowed</h2>

  <div class="test-container">
    TBD
  </div>

</section>
`)

// TODO: tests

},{"../test/util":112}]},{},[111]);
