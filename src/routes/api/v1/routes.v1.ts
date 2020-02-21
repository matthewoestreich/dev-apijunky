/**
 *
 * This is the main router for all /api/v1 routes
 *
 * Each destination beyond /api/v1 passes through here
 *
 */

import { Router } from 'express';

import userRouter from 'routes/api/v1/user';
import bookRouter from 'routes/api/v1/book';
import loginRouter from 'routes/api/v1/login';

const v1Router = Router();

/**
 *
 * - Set 'root prefix' for this router
 * - Add middleware to this router here, if needed
 */
v1Router.use('/v1', v1Router);

/**
 * @route /api/v1/login
 */
v1Router.use(loginRouter);

/**
 * @route /api/v1/user
 */
v1Router.use(userRouter);

/**
 * @route /api/v1/book
 */
v1Router.use(bookRouter);

export default v1Router;
