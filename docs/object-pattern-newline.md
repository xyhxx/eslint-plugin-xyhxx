# object-pattern-newline

> Force one attribute per row when there are multiple rows of object patterns


```js
const obj = {a: 1, b: 2, c: 3, d: 4};

// Bad
const {a,b,
c,d} = obj;

// Bad
const {
  a,b,
  c,d
} = obj;

// Bad
function demo({a,b,
c,d}){}
```


```js
const obj = {a: 1, b: 2, c: 3, d: 4};

// Good
const {
  a,
  b,
  c,
  d,
} = obj;


// Good
function demo({
  a,
  b,
  c,
  d,
}){}
```


