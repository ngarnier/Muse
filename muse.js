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
export function map (array, action) {
  return array.map(action);
}

/*
  Higher order filter

  Usage:
    filter([1, 'hey', '3', 4], !isNaN);

    // => [1, 3, 4]
*/
export function filter (array, fn) {
  return array.filter(fn)
}

/*
  Higher order reduce

  Usage:
    reduce([1,2,3,4], (i, j) => i + j);
*/
export function reduce (array, fn, init = 0) {
  return array.reduce(fn, init);
}

/*
  Higher order forEach

  Usage:
    forEach([1,2,3,4], i => console.log (i))
*/
export function forEach (array, action) {
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
export function defn (...fns) {
  fns = fns.reduce((final, fn) => {
    final[fn.length] = fn
    return final
  }, {})
  return (...args) => console.log (args.length) || fns[args.length].apply({}, args)
}

/*
  Increment a value

  Usage:
    inc(2)
    // => 3
*/
export function inc (v) {
  return v + 1;
}

/*
  Negates a function

  Usage:

  let isNumber = complement(isNaN);
  isNumber(1) // => true
*/
export function complement (fn) {
  return () => !(fn.apply({}, arguments))
}

/*
  Yields a range from `min` to `max` by `step`

  Usage:

    [...range(0, 10)] // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*/
export function* range (min = 0, max = Infinity, step = 1) {
  for (let i = min; i < max; i += step) {
    yield i;
  }
}

/*
  Performs an action n times

  Usage:
    times(3, () => console.log ('Hello'))
*/
export function times (n, action) {
  return map([...range(0, n)], i => action(i));
}

/*
  Flatten an array

  Usage:
    flatten([1, 2, 3, [4, [5, [6, [7, [8, 9]]]]]])

    // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/
export function flatten (v) {
  return v.constructor == Array ?
    Array.prototype.concat.apply([], map(v, flatten)) : [v];
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
export function partial (fn, ...args) {
  /*
    Takes an array `array` and a new array 'nArray'
    and returns a final array filled with the new values

    Usage:
      fillArray([3, 5], [1, 2, null, 3, null]) // => [1, 2, 3, 3, 5]
  */
  function fillArray (nArray, array) {
    let i = 0;
    return map(array, (e) => !e ? nArray[i++] : e);
  }
  return (...nArgs) => fn.apply(null, fillArray(nArgs, args));
}
