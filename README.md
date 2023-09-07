# monad.js

This project provides a basic implementation of a Monad in JavaScript, along with a simple `Result` class to handle success and failure scenarios.

## What is a Monad?

Imagine you have a box. This box can contain a value or another box (which can also contain a value or another box, and so on). A Monad is like this box. It's a design pattern that allows you to work with the values inside these nested boxes without having to open each one individually.

In more technical terms, a Monad is a design pattern used in functional programming to handle program-wide concerns, such as state or I/O, in a pure functional way. But for our purposes, just think of it as a special kind of box that has some rules about how you can use it.

## Overview of the Code

### Monad Class

The `Monad` class represents our special box. It has the following methods:

- `flatMap(f)`: This method allows you to transform the value inside the Monad using a function `f`. If the result is another Monad (another box), it will keep opening the boxes until it gets to the actual value.
  
- `map(f)`: Similar to `flatMap`, but the function `f` doesn't return another Monad. It just transforms the value inside the current Monad.
  
- `attempt()`: This method tries to get the value inside the Monad. If it succeeds, it returns a `Success` result. If there's an error, it returns a `Failure` result.
  
- `static unit(x)`: This is a static method that creates a new Monad containing the value `x`.

- `unsafeRun()`: This triggers the execution of the monad. This operation can result in potential errors, if you want to use it in safe way, `attempt()` wrapping is the prefered suggestion


### Result Class

The `Result` class is a way to handle success and failure scenarios. It has two subclasses:

- `Success`: Represents a successful result. Contains the value of the result.
  
- `Failure`: Represents a failure or error. Contains the error message or object.

## Why Use a Monad?

1. Monads provide a consistent way to handle side effects, errors, and other concerns in functional programming. 
2. By using Monads, you can write more predictable and maintainable code. Even if you're new to functional programming, understanding Monads can give you a new tool to tackle complex problems in JavaScript.

## Getting Started

To use this implementation, simply import the `Monad` and `Result` classes into your project and follow the examples presented blow.

```
const Monad = require('./monad');
const assert = require("assert");
const { Success, Failure } = require('./result');

const firstMonad = Monad.unit(100)

// flatMap composition
const secondMonad = (y) => {
    console.log("Computing")
    return new Monad(x => x * y)
}
const flatMapOperation = firstMonad.flatMap(secondMonad(2))
console.log("Lazy computation with flatMap composition")
const flatMapResult = flatMapOperation.unsafeRun()
console.log(`Result: ${flatMapResult}`)
assert(flatMapResult === 200)

// map composition
const mapMonadFunction = (x) => x * 2
const mapOperation = firstMonad.map(mapMonadFunction)
console.log("Lazy computation with map composition")
const mapResult = mapOperation.unsafeRun()
console.log(`Result: ${mapResult}`)
assert(mapResult === 200)

// successful attemp
const attemptMonad = firstMonad.map(x => x * 2).map(x => x + 1)
const tryAttempt = attemptMonad.attemp()
console.log("Lazy computation for attempt execution")
const attemptResult = tryAttempt.unsafeRun()
console.log(`Result: ${attemptResult.resolve()}`)
assert(attemptResult.value === 201)
assert(attemptResult instanceof Success)

// failed attemp
const failedAattemptMonad = firstMonad.map(() => { throw new Error("aaaaa") })
const failedAttempt = failedAattemptMonad.attemp()
console.log("Lazy computation for failed attempt execution")
const failedResult = failedAttempt.unsafeRun()
console.log(`Result: ${failedResult.resolve()}`)
assert(failedResult instanceof Failure)
assert(failedResult.resolve().message === "aaaaa")
---

In case you wish to run those examples, you can trigger the following command

```
$ npm test
```