import { RequestHandler, Request, Response, NextFunction } from 'express';
import { newGuid } from 'utils';

export const addIdToRequest: RequestHandler = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const dateTime = Date.now();
    const guid = newGuid();
    req.__reqId = `${dateTime}.${guid}`;
    next();
};
