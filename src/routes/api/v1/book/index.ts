/**
 *
 * This is here purely for testing purposes
 *
 */

import { Router, Request, Response } from 'express';

const bookRouter = Router();

/**
 *
 * - Set 'root prefix' for this router
 * - Add middleware to this router here, if needed
 */
bookRouter.use('/book', bookRouter);

// GET /api/v1/book/test
bookRouter.get('/test', (_req: Request, res: Response): void => {
    res.respond(200, 'Test - Book');
});

export default bookRouter;
