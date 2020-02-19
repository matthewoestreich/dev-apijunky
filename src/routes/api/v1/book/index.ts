/**
 *
 * This is here purely for testing purposes
 *
 */

import { Router, Request, Response } from 'express';

const bookRouter = Router();
bookRouter.use('/book', bookRouter);

/**
 * @method GET
 *
 * All GET routes for /api/v1/book go here
 */

// GET /api/v1/book/test
bookRouter.get('/test', (_req: Request, res: Response): void => {
    res.respond(200, 'Test - Book');
});

export default bookRouter;
