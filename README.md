## Muse

![](/assets/logo.png)


![MIT License](https://img.shields.io/badge/license-MIT-007EC7.svg?style=flat-square)
![Current Version](https://img.shields.io/badge/version-0.0.1-green.svg)


## Getting started

``` javascript

import {
  map,
  filter,
  defn,
  ...
} from 'musejs';

```

## Utils

### `map`

Higher order `map`

``` javascript

map([1, 2, 3, 4], i => i + 1)
// => [2, 3, 4, 5]

```

### `filter`

Higher order `filter`

``` javascript

filter([1, 'hey', '3', 4], !isNaN);
// => [1, 3, 4]

```

### `reduce`

Higher order `reduce`

``` javascript

reduce([1, 2, 3, 4], (i, j) => i + j);
// => 10

```

### `foreach`

Higher order `forEach`

``` javascript

forEach([1, 2, 3, 4], i => console.log (i))
// => 1
// => 2
// => 3
// => 4

```

### `reverse`

Higher order reverse

``` javascript

reverse([1, 2, 3])
// => [3, 2, 1]

```

### `id`

Return true if the value is not 0, undefined or null

``` javascript

filter([1, null, 4, undefined, 'Hello'], id)
// => [1, 4, 'Hello']

```

### `complement`

Negates a function

``` javascript

let isNumber = complement(isNaN);
isNumber(1)
// => true

```

### `range`

Yields a range from `min` to `max` by `step`

``` javascript

[...range(0, 10)]
// => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

```

### `times`

Performs an action n times

``` javascript

times(3, () => console.log ('Hello'))
// => Hello
// => Hello
// => Hello

```

### `flatten`

Flatten an array

``` javascript

flatten([1, 2, 3, [4, [5, [6, [7, [8, 9]]]]]])
// => [1, 2, 3, 4, 5, 6, 7, 8, 9]

```

### `partial`

Take a function fn and an array of args with empty spaces
and returns a partial function `g` that take a single arg

``` javascript

let rgb = (r, g, b) => [r, g, b];
let varyGreen = partial(rgb, 4, null, 5);

varyGreen(4)
// => rgb(4, 4, 5);

```

### `thread`

Pass a value to a list of function, one function at a time

``` javascript
thread(
  1,
  i => i + 1,
  i => i - 2
)
// => -1
```

### `compose`

Return a function that takes a value to be threaded in a list of functions

``` javascript

add3AndMultiply3 = compose(add3, multiply3);
add3AndMultiply3(3);
// => 18

```

### `promisify`

Transform a callback style function into a Promise style function

``` javascript
let readfile = promisify(fs.readFile)

let text = readfile('./test.txt')
text.then(console.log.bind(console))

```

### `isNumber`, `isArray`, `isString`, `isObject`

Primitives type checking functions

``` javascript

isNumber('3')
// => true

isString('Hello')
// => true

isArray({name: guillaume})
// => false

```

## Math

### `dotProduct`

Dot product between 2 vectors

``` javascript

dotProduct([1, 2, 3], [4, 5, 6]);
// => 32

```

### `addMatrix`

Matrix/vector addition

``` javascript

addMatrix(
  [[1, 1, 1, 1],
   [1, 1, 1, 1]],

  [[1, 1, 1, 1],
   [1, 1, 1, 1]]
)
// => [[2, 2, 2, 2], [2, 2, 2, 2]]

```

### `getRow`

Returns a matrix row as a vector

``` javascript

getRow(
  [[1, 1, 1, 1, 1],
   [2, 2, 2, 2, 2],
   [1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1]],
  1
)
// => [2, 2, 2, 2, 2]

```

### `getColumn`

Returns a matrix column as a vector

``` javascript

getColumn(
  [[2, 1, 1, 1, 1],
   [2, 1, 1, 1, 1],
   [2, 1, 1, 1, 1],
   [2, 1, 1, 1, 1]],
   0
)
// => [2, 2, 2, 2, 2]

```

### `multMatrix`

Performs a matricex multiplication

``` javascript
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
// => [ [58, 64],
//      [139, 154]]
```

### `matrixDimensions`

Returns a matrix dimensions [rows, columns]

``` javascript

const [rows, columns] = matrixDimensions(myMatrix);

```

### `transpose`

Transpose a matrix

``` javascript

console.log (transpose([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]))
// => [   [ 1, 4, 7 ],
//        [ 2, 5, 8 ],
//        [ 3, 6, 9 ]   ]
```
