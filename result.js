class Result {

    resolve() {
        throw new Error("Unsupported operation: Result.resolve")
    }

}

class Success extends Result {
    constructor(value) {
        super()
        this.value = value;
    }

    resolve() {
        return this.value;
    }
}

class Failure extends Result {
    constructor(error) {
        super()
        this.error = error;
    }

    resolve() {
        return this.error;
    }
}

module.exports = {
    Success: Success,
    Failure: Failure
}