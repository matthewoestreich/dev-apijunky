/* eslint-disable max-classes-per-file */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorData = { [key: string]: any };

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
}

export class RouteNotFoundError extends CustomError {
    constructor(originalUrl: string) {
        super(`Route '${originalUrl}' does not exist.`, 'ROUTE_NOT_FOUND', 404);
    }
}
