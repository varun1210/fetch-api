class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "BadRequestError";
    }
}

class BaseURLError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name = "BaseURLError"
    }
}

module.exports = { BadRequestError, BaseURLError }