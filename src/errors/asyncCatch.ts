import { RequestHandler, Request, Response, NextFunction } from 'express';

/**
 * This method is used as a 'catch-all-error-handler' in order to make catching
 * errors easier.  This method is used when handling requests, this gives us
 * greater control of the errors that are thrown, due to this method working
 * 'in tandem' with the 'handleError' middleware.
 *
 * Together, these two methods allow for fine grain control over the format and
 * types of errors that are thrown.
 *
 * 'handleError' is used as the last 'app.use(..)' in the app config.
 *
 * @param requestHandler {RequestHandler} Express RequestHandler
 */
export const asyncCatch = (requestHandler: RequestHandler): RequestHandler => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            return await requestHandler(req, res, next);
        } catch (error) /* istanbul ignore next */ {
            next(error);
        }
    };
};
