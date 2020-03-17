import { Request, Response } from 'express';

import { asyncCatch } from 'errors';

export const sayHelloWorld = asyncCatch((_req: Request, res: Response): void => {
    res.respond(200, 'Hello, World!');
});

export const destroyRequest = (req: Request, res: Response): void => {
    res.status(408).end();
};
