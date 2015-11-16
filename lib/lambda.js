
/*
  Define an overloaded function
  returns a function that select the function to use depending on
  the number of parameters passed.

  Usage:

  let inc = defn(
    (value) => inc(value, 1),
    (value, step) => value + step
  )

  inc(3);
  inc(2, 4);
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defn = defn;
exports.getenv = getenv;
exports.complement = complement;
exports.range = range;
exports["default"] = partial;
var marked0$0 = [range].map(regeneratorRuntime.mark);

function defn() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  fns = fns.reduce(function (final, fn) {
    final[fn.length] = fn;
    return final;
  }, {});
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns[args.length].apply({}, args);
  };
}

/*
  Increment a value
*/
var inc = defn(function (value) {
  return inc(value, 1);
}, function (value, step) {
  return value + 1;
});

exports.inc = inc;
/*
  php function getenv() to retrieve an env variable
*/

function getenv(key) {
  return process.env[key];
}

/*
  Negates a function

  Usage:

  let isNumber = complement(isNaN);
  isNumber(1) // => true
*/

function complement(fn) {
  return function () {
    return !fn.apply({}, arguments);
  };
}

/*
  Yields a range from `min` to `max` by `step`
*/

function range() {
  var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var max = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];
  var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
  var i;
  return regeneratorRuntime.wrap(function range$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        i = min;

      case 1:
        if (!(i < max)) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 4;
        return i;

      case 4:
        i += step;
        context$1$0.next = 1;
        break;

      case 7:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

/*
  Takes an array `array` [1, 2, null, 3, null]
  and a new array 'nArray' [3, 5]
  and returns an final array [1, 2, 3, 3, 5]
*/
function fillArray(nArray, array) {
  var i = 0;
  return array.map(function (e) {
    return !e ? nArray[i++] : e;
  });
}

/*
  Take a function fn and an array of args [1, null, 4]
  and returns a partial function `g` that take a single arg
  => g(3) = fn(1, 3, 4)
*/

function partial(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, nArgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      nArgs[_key4] = arguments[_key4];
    }

    return fn.apply(null, fillArray(nArgs, args));
  };
}