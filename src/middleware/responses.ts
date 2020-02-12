import { RequestHandler, Request, Response, NextFunction } from 'express';

export const addRespondToResponse: RequestHandler = (
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.respond = (status: number, data: object | string): void => {
        res.status(status).send(data);
    };
    next();
};
