class ApiError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }

    static BadRequestError(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}