/**
 *
 * This is the main router for all /api routes
 *
 * Each route beyond /api passes through here
 *
 */

import { Router } from 'express';

import v1Router from 'routes/api/v1';

const apiRouter = Router();

apiRouter.use('/api', v1Router);

export default apiRouter;
