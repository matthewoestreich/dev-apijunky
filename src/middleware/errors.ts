/* eslint-disable spaced-comment */
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { CustomError, CreateEntityError } from 'errors';

export const handleError: ErrorRequestHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: CustomError | CreateEntityError | any,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    let isErrorSafeForClient = false;
    if (error instanceof CustomError || error instanceof CreateEntityError) {
        isErrorSafeForClient = true;
    }

    /* istanbul ignore next */
    const clientError = isErrorSafeForClient
        ? { ...error }
        : {
              message: 'Something went wrong.',
              code: 'INTERNAL_ERROR',
              status: 500,
              data: error.data ? error.data : {},
          };

    // res.status(200).send({ isErrorSafeForClient, errType: error.constructor.name });
    res.status(clientError.status).send({ error: clientError, ...error });
};
