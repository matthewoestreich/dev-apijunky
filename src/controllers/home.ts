import { Request, Response } from 'express';
import { yellow, magenta } from 'chalk';

import { catchErrors } from 'errors';

export const sayHelloWorld = catchErrors((_req: Request, res: Response): void => {
    res.respond(200, 'Hello, World!');
});

export const destroyRequest = (req: Request, res: Response): void => {
    console.log(yellow(`Destroying request '${magenta(req.__reqId)}' to '${req.originalUrl}'\r\n`));
    res.status(408).end();
};
