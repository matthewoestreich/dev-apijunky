import { Request, Response } from 'express';
import { catchErrors } from 'errors';

export const sayHelloWorld = catchErrors((_req: Request, res: Response): void => {
    res.respond(200, 'Hello, World!');
});
