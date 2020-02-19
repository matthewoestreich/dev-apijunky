/**
 *
 * This is the main router for all /api/v1 routes
 *
 * Each destination beyond /api/v1 passes through here
 *
 */

import express from 'express';

import apiVersionOneUserRouter from 'routes/api/v1/user';

const apiVersionOneMainRouter = express.Router();
apiVersionOneMainRouter.route('/v1');

/**
 * @route /api/v1/user
 */
apiVersionOneMainRouter.use('/user', apiVersionOneUserRouter);

export default apiVersionOneMainRouter;
