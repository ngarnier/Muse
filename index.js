
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
  Higher order object getter

  Usage:
    [{name: guillaume, age: 21}, {name: donald, age: 23}]
      .map(partial(get, null, 'name'))

    // => [guillaume, donald]
*/
export function get (obj, key) {
  return obj[key];
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
  return (...args) => fns[args.length].apply({}, args)
}

/*
  Increment a value

  Usage:

    inc(3); // => 4
    inc(2, 4); // => 6
*/
export const inc = defn(
  (value) => inc(value, 1),
  (value, step) => value + 1
);

/*
  Negates a function

  Usage:

  let isNumber = complement(isNaN);
  isNumber(1) // => true
*/
export function complement (fn) {
  return function () {
    return !(fn.apply({}, arguments))
  }
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
  Take a function fn and an array of args with empty spaces
  and returns a partial function `g` that take a single arg

  Usage:
    let add = (a, b) => a + b;
    let rgb = (r, g. b) => [r, g, b];

    let add3 = partial(add, 3)
    let varyGreen = partial(rgb, 4, null, 5);

    varyGreen(4) // => rgb(4, 4, 5);

*/
export default function partial (fn, ...args) {
  /*
    Takes an array `array` and a new array 'nArray'
    and returns a final array filled with the new values

    Usage:
      fillArray([3, 5], [1, 2, null, 3, null]) // => [1, 2, 3, 3, 5]
  */
  function fillArray (nArray, array) {
    let i = 0;
    return array.map((e) => !e ? nArray[i++] : e);
  }
  return (...nArgs) => fn.apply(null, fillArray(nArgs, args));
}
