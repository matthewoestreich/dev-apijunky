/**
 *
 * This is the "root" routes file.
 *
 * This file holds all low-level (one level deep) routes. Meaning,
 * if you have routes like:
 *   - /api/v1/customers
 *   - /api/v2/books
 * then this file defines the main route for /api. All other routes,
 * like for /api/v1 are passed into other routers which this router
 * will use.
 *
 */

import { Application } from 'express';

import apiRouter from 'routes/api';

export const attachApiRoutes = (app: Application): void => {
    app.use(apiRouter);
};
