/**
 *
 * This is the main router for all /api/v1 routes
 *
 * Each destination beyond /api/v1 passes through here
 *
 */

import express from 'express';

import userRouter from 'routes/api/v1/user';
import bookRouter from 'routes/api/v1/book';
import loginRouter from 'routes/api/v1/login';

const v1Router = express.Router();

v1Router.use('/v1', v1Router);

/**
 *
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
