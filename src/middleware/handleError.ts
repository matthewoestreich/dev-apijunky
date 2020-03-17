import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { CustomError, CustomErrorParams, RouteNotFoundError } from 'errors';

export const handleError: ErrorRequestHandler = <T extends CustomErrorParams>(
    error: T,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    const isErrorSafeForClient = error instanceof CustomError;

    /* istanbul ignore next */
    const clientError = isErrorSafeForClient
        ? { ...error }
        : {
              message: error.message ? error.message : 'Something went wrong.',
              code: error.code ? error.code : 'ERROR',
              status: error.status ? error.status : 500,
              data: error.data ? error.data : {},
          };

    res.respond(clientError.status, { error: clientError });
};

export const routeNotFound = (req: Request, _res: Response, next: NextFunction): void => {
    next(new RouteNotFoundError(req.originalUrl));
};
