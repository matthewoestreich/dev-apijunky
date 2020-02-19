/**
 *
 * This is the main router for all /api routes
 *
 * Each route beyond /api passes through here
 *
 */

import express from 'express';

import apiVersionOneMainRouter from 'routes/api/v1';

const apiRouter = express.Router();

apiRouter.route('/api');

/**
 * @route /api/v1
 */
apiRouter.use(apiVersionOneMainRouter);

export default apiRouter;
