import { RequestHandler, Request, Response, NextFunction, Application } from 'express';

const addRespondToResponse: RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
    res.respond = (status: number, data: object | string): void => {
        res.status(status).send(data);
    };
    next();
};

export const attachResponseExtensionProps = (app: Application): void => {
    app.use(addRespondToResponse);
};
