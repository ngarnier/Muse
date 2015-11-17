"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
exports.filter = filter;
exports.reduce = reduce;
exports.forEach = forEach;
exports.defn = defn;
exports.complement = complement;
exports.range = range;
exports.times = times;
exports.flatten = flatten;
exports.default = partial;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = [range].map(regeneratorRuntime.mark);

/*

Copyright (c) 2015 Guillaume Badi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

/*
  Higher order map

  Usage:
    map([1,2,3,4], i => i + 1);
*/
function map(array, action) {
  return array.map(action);
}

/*
  Higher order filter

  Usage:
    filter([1, 'hey', '3', 4], !isNaN);

    // => [1, 3, 4]
*/
function filter(array, fn) {
  return array.filter(fn);
}

/*
  Higher order reduce

  Usage:
    reduce([1,2,3,4], (i, j) => i + j);
*/
function reduce(array, fn) {
  var init = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  return array.reduce(fn, init);
}

/*
  Higher order forEach

  Usage:
    forEach([1,2,3,4], i => console.log (i))
*/
function forEach(array, action) {
  return array.forEach(action);
}

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
  Negates a function

  Usage:

  let isNumber = complement(isNaN);
  isNumber(1) // => true
*/
function complement(fn) {
  var _arguments = arguments;

  return function () {
    return !fn.apply({}, _arguments);
  };
}

/*
  Yields a range from `min` to `max` by `step`

  Usage:

    [...range(0, 10)] // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*/
function range() {
  var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var max = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];
  var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
  var i;
  return regeneratorRuntime.wrap(function range$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        i = min;

      case 1:
        if (!(i < max)) {
          _context.next = 7;
          break;
        }

        _context.next = 4;
        return i;

      case 4:
        i += step;
        _context.next = 1;
        break;

      case 7:
      case "end":
        return _context.stop();
    }
  }, _marked[0], this);
}

/*
  Performs an action n times

  Usage:
    times(3, () => console.log ('Hello'))
*/
function times(n, action) {
  return map([].concat(_toConsumableArray(range(0, n))), function (i) {
    return action(i);
  });
}

/*
  Flatten an array

  Usage:
    flatten([1, 2, 3, [4, [5, [6, [7, [8, 9]]]]]])

    // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/
function flatten(v) {
  return v.constructor == Array ? Array.prototype.concat.apply([], map(v, flatten)) : [v];
}

/*
  Take a function fn and an array of args with empty spaces
  and returns a partial function `g` that take a single arg

  Usage:
    let add = (a, b) => a + b;
    let rgb = (r, g, b) => [r, g, b];

    let add3 = partial(add, 3)
    let varyGreen = partial(rgb, 4, null, 5);

    varyGreen(4) // => rgb(4, 4, 5);

*/
function partial(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  /*
    Takes an array `array` and a new array 'nArray'
    and returns a final array filled with the new values
     Usage:
      fillArray([3, 5], [1, 2, null, 3, null]) // => [1, 2, 3, 3, 5]
  */
  function fillArray(nArray, array) {
    var i = 0;
    return map(array, function (e) {
      return !e ? nArray[i++] : e;
    });
  }
  return function () {
    for (var _len4 = arguments.length, nArgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      nArgs[_key4] = arguments[_key4];
    }

    return fn.apply(null, fillArray(nArgs, args));
  };
}
//# sourceMappingURL=data:application/json;base64,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UyxPQUFPLENBQUUsRUFBRSxFQUFXO3FDQUFOLElBQUk7QUFBSixRQUFJOzs7Ozs7Ozs7QUFRMUMsV0FBUyxTQUFTLENBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUNqQyxRQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDVixXQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBQyxDQUFDO2FBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztLQUFBLENBQUMsQ0FBQztHQUNoRDtBQUNELFNBQU87dUNBQUksS0FBSztBQUFMLFdBQUs7OztXQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FBQSxDQUFDO0NBQzdEIiwiZmlsZSI6Im11c2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgR3VpbGxhdW1lIEJhZGlcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cblxuKi9cblxuXG4vKlxuICBIaWdoZXIgb3JkZXIgbWFwXG5cbiAgVXNhZ2U6XG4gICAgbWFwKFsxLDIsMyw0XSwgaSA9PiBpICsgMSk7XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcCAoYXJyYXksIGFjdGlvbikge1xuICByZXR1cm4gYXJyYXkubWFwKGFjdGlvbik7XG59XG5cbi8qXG4gIEhpZ2hlciBvcmRlciBmaWx0ZXJcblxuICBVc2FnZTpcbiAgICBmaWx0ZXIoWzEsICdoZXknLCAnMycsIDRdLCAhaXNOYU4pO1xuXG4gICAgLy8gPT4gWzEsIDMsIDRdXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlciAoYXJyYXksIGZuKSB7XG4gIHJldHVybiBhcnJheS5maWx0ZXIoZm4pXG59XG5cbi8qXG4gIEhpZ2hlciBvcmRlciByZWR1Y2VcblxuICBVc2FnZTpcbiAgICByZWR1Y2UoWzEsMiwzLDRdLCAoaSwgaikgPT4gaSArIGopO1xuKi9cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2UgKGFycmF5LCBmbiwgaW5pdCA9IDApIHtcbiAgcmV0dXJuIGFycmF5LnJlZHVjZShmbiwgaW5pdCk7XG59XG5cbi8qXG4gIEhpZ2hlciBvcmRlciBmb3JFYWNoXG5cbiAgVXNhZ2U6XG4gICAgZm9yRWFjaChbMSwyLDMsNF0sIGkgPT4gY29uc29sZS5sb2cgKGkpKVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoIChhcnJheSwgYWN0aW9uKSB7XG4gIHJldHVybiBhcnJheS5mb3JFYWNoKGFjdGlvbik7XG59XG5cbi8qXG4gIERlZmluZSBhbiBvdmVybG9hZGVkIGZ1bmN0aW9uXG4gIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHNlbGVjdCB0aGUgZnVuY3Rpb24gdG8gdXNlIGRlcGVuZGluZyBvblxuICB0aGUgbnVtYmVyIG9mIHBhcmFtZXRlcnMgcGFzc2VkLlxuXG4gIFVzYWdlOlxuXG4gIGxldCBpbmMgPSBkZWZuKFxuICAgICh2YWx1ZSkgPT4gaW5jKHZhbHVlLCAxKSxcbiAgICAodmFsdWUsIHN0ZXApID0+IHZhbHVlICsgc3RlcFxuICApXG5cbiAgaW5jKDMpO1xuICBpbmMoMiwgNCk7XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZm4gKC4uLmZucykge1xuICBmbnMgPSBmbnMucmVkdWNlKChmaW5hbCwgZm4pID0+IHtcbiAgICBmaW5hbFtmbi5sZW5ndGhdID0gZm5cbiAgICByZXR1cm4gZmluYWxcbiAgfSwge30pXG4gIHJldHVybiAoLi4uYXJncykgPT4gZm5zW2FyZ3MubGVuZ3RoXS5hcHBseSh7fSwgYXJncylcbn1cblxuLypcbiAgTmVnYXRlcyBhIGZ1bmN0aW9uXG5cbiAgVXNhZ2U6XG5cbiAgbGV0IGlzTnVtYmVyID0gY29tcGxlbWVudChpc05hTik7XG4gIGlzTnVtYmVyKDEpIC8vID0+IHRydWVcbiovXG5leHBvcnQgZnVuY3Rpb24gY29tcGxlbWVudCAoZm4pIHtcbiAgcmV0dXJuICgpID0+ICEoZm4uYXBwbHkoe30sIGFyZ3VtZW50cykpXG59XG5cbi8qXG4gIFlpZWxkcyBhIHJhbmdlIGZyb20gYG1pbmAgdG8gYG1heGAgYnkgYHN0ZXBgXG5cbiAgVXNhZ2U6XG5cbiAgICBbLi4ucmFuZ2UoMCwgMTApXSAvLyA9PiBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdXG4qL1xuZXhwb3J0IGZ1bmN0aW9uKiByYW5nZSAobWluID0gMCwgbWF4ID0gSW5maW5pdHksIHN0ZXAgPSAxKSB7XG4gIGZvciAobGV0IGkgPSBtaW47IGkgPCBtYXg7IGkgKz0gc3RlcCkge1xuICAgIHlpZWxkIGk7XG4gIH1cbn1cblxuLypcbiAgUGVyZm9ybXMgYW4gYWN0aW9uIG4gdGltZXNcblxuICBVc2FnZTpcbiAgICB0aW1lcygzLCAoKSA9PiBjb25zb2xlLmxvZyAoJ0hlbGxvJykpXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVzIChuLCBhY3Rpb24pIHtcbiAgcmV0dXJuIG1hcChbLi4ucmFuZ2UoMCwgbildLCBpID0+IGFjdGlvbihpKSk7XG59XG5cbi8qXG4gIEZsYXR0ZW4gYW4gYXJyYXlcblxuICBVc2FnZTpcbiAgICBmbGF0dGVuKFsxLCAyLCAzLCBbNCwgWzUsIFs2LCBbNywgWzgsIDldXV1dXV0pXG5cbiAgICAvLyA9PiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV1cbiovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbiAodikge1xuICByZXR1cm4gdi5jb25zdHJ1Y3RvciA9PSBBcnJheSA/XG4gICAgQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgbWFwKHYsIGZsYXR0ZW4pKSA6IFt2XTtcbn1cblxuLypcbiAgVGFrZSBhIGZ1bmN0aW9uIGZuIGFuZCBhbiBhcnJheSBvZiBhcmdzIHdpdGggZW1wdHkgc3BhY2VzXG4gIGFuZCByZXR1cm5zIGEgcGFydGlhbCBmdW5jdGlvbiBgZ2AgdGhhdCB0YWtlIGEgc2luZ2xlIGFyZ1xuXG4gIFVzYWdlOlxuICAgIGxldCBhZGQgPSAoYSwgYikgPT4gYSArIGI7XG4gICAgbGV0IHJnYiA9IChyLCBnLCBiKSA9PiBbciwgZywgYl07XG5cbiAgICBsZXQgYWRkMyA9IHBhcnRpYWwoYWRkLCAzKVxuICAgIGxldCB2YXJ5R3JlZW4gPSBwYXJ0aWFsKHJnYiwgNCwgbnVsbCwgNSk7XG5cbiAgICB2YXJ5R3JlZW4oNCkgLy8gPT4gcmdiKDQsIDQsIDUpO1xuXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFydGlhbCAoZm4sIC4uLmFyZ3MpIHtcbiAgLypcbiAgICBUYWtlcyBhbiBhcnJheSBgYXJyYXlgIGFuZCBhIG5ldyBhcnJheSAnbkFycmF5J1xuICAgIGFuZCByZXR1cm5zIGEgZmluYWwgYXJyYXkgZmlsbGVkIHdpdGggdGhlIG5ldyB2YWx1ZXNcblxuICAgIFVzYWdlOlxuICAgICAgZmlsbEFycmF5KFszLCA1XSwgWzEsIDIsIG51bGwsIDMsIG51bGxdKSAvLyA9PiBbMSwgMiwgMywgMywgNV1cbiAgKi9cbiAgZnVuY3Rpb24gZmlsbEFycmF5IChuQXJyYXksIGFycmF5KSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIHJldHVybiBtYXAoYXJyYXksIChlKSA9PiAhZSA/IG5BcnJheVtpKytdIDogZSk7XG4gIH1cbiAgcmV0dXJuICguLi5uQXJncykgPT4gZm4uYXBwbHkobnVsbCwgZmlsbEFycmF5KG5BcmdzLCBhcmdzKSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
