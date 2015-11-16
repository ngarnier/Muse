
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
*/
export function* range (min = 0, max = Infinity, step = 1) {
  for (let i = min; i < max; i += step) {
    yield i;
  }
}

/*
  Takes an array `array` [1, 2, null, 3, null]
  and a new array 'nArray' [3, 5]
  and returns an final array [1, 2, 3, 3, 5]
*/
function fillArray (nArray, array) {
  let i = 0;
  return array.map((e) => !e ? nArray[i++] : e);
}

/*
  Take a function fn and an array of args [1, null, 4]
  and returns a partial function `g` that take a single arg
  => g(3) = fn(1, 3, 4)
*/
export default function partial (fn, ...args) {
  return (...nArgs) => fn.apply(null, fillArray(nArgs, args));
}
