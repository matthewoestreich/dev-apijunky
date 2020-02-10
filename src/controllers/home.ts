import { Request, Response } from 'express';
import { catchErrors } from 'errors';

export const SayHelloWorld = catchErrors(async (_req: Request, res: Response) => {
    res.status(200).send('Hello, World!');
});
