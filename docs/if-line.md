# if-lin

> After if, a single line is forced to display one line

```js

// Bad
if(true) 
    console.log(12);

// Bad
function test(val) {
   if (
    val > 10 
    || val < 100
   )
   return '';
}
```

```js
// Good
if(true) console.log(12)

// Good
function test(val) {
   if (
    val > 10 
    || val < 100
   ) return '';
}

// Good
if(true) {
    console.log(12)
} else {
    console.log(11)
}
```
