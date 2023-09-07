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

