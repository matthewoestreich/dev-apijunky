/* eslint-disable max-classes-per-file */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorData = { [key: string]: any };

export interface CustomErrorParams {
    message: string;
    status: number;
    data: object;
    code: string | number;
}

export class CustomError extends Error {
    constructor(
        public message: string,
        /* istanbul ignore next */
        public code: string | number = 'INTERNAL_ERROR',
        /* istanbul ignore next */
        public status: number = 500,
        public data: ErrorData = {},
    ) {
        super();
    }

    static toss = (message: string, data: ErrorData): void => {
        const ce = new CustomError(message);
        ce.data = data;
        throw ce;
    };
}

export class RouteNotFoundError extends CustomError {
    constructor(originalUrl: string) {
        super(`Route '${originalUrl}' does not exist.`, 'ROUTE_NOT_FOUND', 404);
    }
}

export class EntityNotFoundError extends CustomError {
    constructor(entityName: string) {
        super(`${entityName} not found.`, 'ENTITY_NOT_FOUND', 404);
    }
}

export class CreateEntityError extends CustomError {
    constructor(entityName: string, data: ErrorData = {}) {
        super(`Unable to create entity ${entityName}`);
        this.data = data;
    }
}

export class BadUserInputError extends CustomError {
    constructor(errorData: ErrorData) {
        super('There were validation errors.', 'BAD_USER_INPUT', 400, errorData);
    }
}

export class BadRequest extends CustomError {
    constructor(errorData?: object) {
        super('Received Bad Request.', 'INVALID_REQUEST', 400, errorData || {});
    }
}

export class InvalidTokenError extends CustomError {
    constructor(message = 'Authentication token is invalid.') {
        super(message, 'INVALID_TOKEN', 401);
    }
}

export class ExpiredTokenError extends CustomError {
    constructor(message = 'Authentication token is expired.', data = {}) {
        super(message, 'EXPIRED_TOKEN', 401, data);
    }
}
