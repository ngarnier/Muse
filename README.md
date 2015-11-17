![](/assets/logo.png)

## API

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

### `forEach`

Higher order `forEach`

``` javascript

forEach([1, 2, 3, 4], i => console.log (i))
// => 1
// => 2
// => 3
// => 4

```

### `defn`

Define a polyvariadic function and returns a function that select the action to use depending on the number of parameters passed.

``` javascript

export const inc = defn(
  (value) => inc(value, 1),
  (value, step) => value + 1
);

inc(2);
inc(3, 2)

// => 3
// => 5

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
