import { RequestHandler, Request, Response, NextFunction } from 'express';
import { createGuid } from 'utils';

export const addIdToRequest: RequestHandler = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const dateTime = Date.now();
    const guid = createGuid();
    req.__reqId = `${dateTime}.${guid}`;
    next();
};
