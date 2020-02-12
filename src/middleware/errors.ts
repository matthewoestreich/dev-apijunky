import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import { CustomError } from 'errors';

export const handleError: ErrorRequestHandler = (
    error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    const isErrorSafeForClient = error instanceof CustomError;

    /* istanbul ignore next */
    const clientError = isErrorSafeForClient
        ? { ...error }
        : {
              message: 'Something went wrong, please contact our support.',
              code: 'INTERNAL_ERROR',
              status: 500,
              data: {},
          };

    console.log(clientError);

    res.status(clientError.status).send({ error: clientError });
};
