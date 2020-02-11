import { ErrorRequestHandler, Request, Response } from 'express';

import { CustomError } from 'errors';

export const handleError: ErrorRequestHandler = (error, _req: Request, res: Response): void => {
    console.error(error);

    const isErrorSafeForClient = error instanceof CustomError;

    const clientError = isErrorSafeForClient
        ? { ...error }
        : {
              message: 'Something went wrong, please contact our support.',
              code: 'INTERNAL_ERROR',
              status: 500,
              data: {},
          };

    res.status(clientError.status).send({ error: clientError });
};
