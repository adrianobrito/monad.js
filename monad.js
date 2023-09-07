const Result = require('./result');

class Monad {
    constructor(unsafeRun) {
        this.unsafeRun = unsafeRun;
        this.isStarted = false;
    }

    flatMap(f) {
        const internalUnsafeRun = this.unsafeRun
        return new Monad(() => {
            let result = internalUnsafeRun()
            while (result instanceof Monad) {
                result = result.unsafeRun()
            }
            return f.unsafeRun(result)
        })

    }

    map(f) {
        const internalUnsafeRun = this.unsafeRun
        return new Monad(() => {
            let result = internalUnsafeRun()
            while (result instanceof Monad) {
                result = result.unsafeRun()
            }
            return f(result)
        })
    }

    attemp() {
        const internalUnsafeRun = this.unsafeRun
        return new Monad(() => {
            try {
                const result = internalUnsafeRun()
                return new Result.Success(result)
            } catch (e) {
                return new Result.Failure(e)
            }
        })
    }

    static unit(x) {
        return new Monad(() => x)
    }

}

module.exports = Monad;
