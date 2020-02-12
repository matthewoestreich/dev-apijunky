import { RequestHandler, Request, Response, NextFunction } from 'express';

export const catchErrors = (requestHandler: RequestHandler): RequestHandler => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            return await requestHandler(req, res, next);
        } catch (error) /* istanbul ignore next */ {
            next(error);
        }
    };
};
