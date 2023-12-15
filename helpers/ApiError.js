const { STATUS_CODES } = require('http');
const { constants } = require('node:http2');


class HandlerError {
    constructor(code, message, errors = {}) {
        this.code = code;
        this.message = message;
        if(errors) {
            this.errors = errors;
        }
    }

    static badRequest(message) {
        return new HandlerError(constants.HTTP_STATUS_BAD_REQUEST, message);
    }

    static unauthorized(message = STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED]) {
        return new HandlerError(constants.HTTP_STATUS_UNAUTHORIZED, message);
    }

    static forbidden(message = STATUS_CODES[constants.HTTP_STATUS_FORBIDDEN]) {
        return new HandlerError(constants.HTTP_STATUS_FORBIDDEN, message);
    }

    static notFound(message = STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]) {
        return new HandlerError(constants.HTTP_STATUS_NOT_FOUND, message);
    }

    static methodNotAllowed(message = STATUS_CODES[constants.HTTP_STATUS_METHOD_NOT_ALLOWED]) {
        return new HandlerError(constants.HTTP_STATUS_METHOD_NOT_ALLOWED, message);
    }

    static uproccessableEntity(message = STATUS_CODES[constants.HTTP_STATUS_UNPROCESSABLE_ENTITY], errors) {
        return new HandlerError(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY, message, errors);
    }

    static internalServerError(message = STATUS_CODES[constants.HTTP_STATUS_INTERNAL_SERVER_ERROR]) {
        console.log(message);
        return new HandlerError(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY, message);
    }
}


module.exports = HandlerError;