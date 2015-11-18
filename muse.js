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

import assert from 'assert';

/*
  Basic Math functions
*/
const add = (a, b) => a + b;
const mult = (a, b) => a * b;

/*
  Higher order reduce

  Usage:
    reduce([1,2,3,4], (i, j) => i + j);
*/
export function reduce (array, fn, init = 0) {
  return array.reduce(fn, init);
}

/*
  Higher order map

  Usage:
    map([1,2,3,4], i => i + 1);
*/
export function map (array, action) {
  return array.map(action);
}

/*
  Higher order reverse

  Usage:
    reverse([1, 2, 3])
    // => [3, 2, 1]
*/
export function reverse (array) {
  return array.reverse();
}

/*
  Higher order filter

  Usage:
    filter([1, 'hey', '3', 4], !isNaN);

    // => [1, 3, 4]
*/
export function filter (array, fn) {
  return array.filter(fn);
}

/*
  Higher order forEach

  Usage:
    forEach([1,2,3,4], i => console.log (i))
*/
export function foreach (array, action) {
  assert(isArray(array));
  return array.forEach(action);
}

/*
  Return true if the value is not 0, undefined or null

  Usage
    filter([1, null, 4, undefined, 'Hello'], id)
    // => [1, 4, 'Hello']
*/
export function id (e) {
  return !!e;
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
  assert(isNumber(n));
  return map([...range(0, n)], i => action(i));
}

/*
  Dot product between 2 vectors

  Usage:
    dotProduct([1, 2, 3], [4, 5, 6]);
    // => 32
*/
export function dotProduct (v1, v2) {
  assert(isArray(v1) && isArray(v2));
  assert(v1.length === v2.length);
  return reduce(v1, (f, n, i) => v2[i] * n + f, 0);
}

/*
  Matrix/vector addition

  Usage:
    addMatrix(
      [[1, 1, 1, 1], [1, 1, 1, 1]],
      [[1, 1, 1, 1], [1, 1, 1, 1]]
    )
    // => [[2, 2, 2, 2], [2, 2, 2, 2]]

*/
export function addMatrix (m1, m2) {
  return map(m1, (e, i) =>
    isArray(e) ? addMatrix(e, m2[i]) : e + m2[i]);
}

/*
  Returns a matrix row as a vector

  Usage:
    getRow(
      [[1, 1, 1, 1, 1],
       [2, 2, 2, 2, 2],
       [1, 1, 1, 1, 1],
       [1, 1, 1, 1, 1]],
      1
    )
    // => [2, 2, 2, 2, 2]
*/
export function getRow (matrix, index) {
  return matrix[index];
}

/*
  Returns a matrix column as a vector

  Usage:
    getColumn(
      [[2, 1, 1, 1, 1],
       [2, 1, 1, 1, 1],
       [2, 1, 1, 1, 1],
       [2, 1, 1, 1, 1]],
       0
    )
    // => [2, 2, 2, 2, 2]
*/
export function getColumn (matrix, index) {
  return map(matrix, i => i[index]);
}

/*
  Performs a matricex multiplication

  Usage:
    const m1 = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    const m2 = [
      [7, 8],
      [9 , 10],
      [11, 12]
    ]
    multMatrix(m1, m2)
    // => [
      [58, 64],
      [139, 154]
    ]
*/
export function multMatrix (m1, m2) {
  return map(m1, row =>
    times(m1.length, i => dotProduct(row, getColumn(m2, i))));
}

/*
  Returns a matrix dimensions [rows, columns]

  Usage:
    const [rows, columns] = matrixDimensions(myMatrix);
*/
export function matrixDimensions (m) {
  return [m.length, m[0].length];
}

/*
  Transpose a matrix

  Usage:
    console.log (transpose([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]))
    // => [ [ 1, 4, 7 ],
            [ 2, 5, 8 ],
            [ 3, 6, 9 ] ]
*/
export function transpose (m) {
  const [_, columns] = matrixDimensions(m);
  return times(columns, i => getColumn(m, i));
}

console.log(transpose([[0,1,1,0]]))

/*
  Pass a value to a list of function, one function at
    a time

  Usage:
    thread(
      1,
      i => i + 1,
      i => i - 2
    )
    // => -1

*/
export function thread (value, ...fn) {
  assert(isNumber(value) && fn.length > 0);
  foreach(fn, f => value = f(value));
  return value
}

/*
  Return a function that takes a value to be threaded in a list of functions

  Usage:
    add3AndMultiply3 = compose(add3, multiply3);
    add3AndMultiply3(3);
    // => 18
*/
export function compose (...fns) {
  assert(fns.length > 0);
  return (value) => thread.apply(null, flatten([value, fns]))
}

/*
  Transform a callback style function into a Promise style function

  Usage:
    let readfile = promisify(fs.readFile)

    let text = readfile('./test.txt')
    text.then(console.log.bind(console))
*/
export function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) =>
      fn.apply(null, args.concat((e, ...data) =>
        e ? reject(e) : resolve.apply(null, data))));
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

  Primitives type checking functions

  Usage:
    isNumber('3')
    // => true

    isString('Hello')
    // => true

    isArray({name: guillaume})
    // => false

*/
export function isNumber (n) {
  return !isNaN(n);
}

export function isString (n) {
  return typeof n === 'string';
}

export function isArray (n) {
  return n instanceof Array;
}

export function isObject(n) {
  return {}.constructor === n.constructor;
}
