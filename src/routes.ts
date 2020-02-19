import express, { Application, RequestHandler } from 'express';

import { API_PATHS } from 'constants/routes';

import * as home from 'controllers/root';
import * as apiV1 from 'controllers/api/v1';

const attachApiV1PublicRoutes = (app: Application): void => {
    /**
     * @path /api/v1/
     */
    const apiV1PublicRouter = express.Router();

    apiV1PublicRouter.post('/login', apiV1.logUserInAndReturnToken);

    app.use(API_PATHS.v1.root, apiV1PublicRouter);
};

const attachApiV1UserRoutes = (app: Application, middleware: RequestHandler[]): void => {
    /**
     * @path /api/v1/user/
     */
    const apiV1UserRouter = express.Router();

    // POST /api/v1/user/*
    apiV1UserRouter.post('/test', apiV1.test);
    apiV1UserRouter.post('/createtestuser', apiV1.createTestUser);
    apiV1UserRouter.post('/create', apiV1.createNewUser); // ?un=username&pw=password
    apiV1UserRouter.post('/find', apiV1.findUser); // ?un=username

    app.use(API_PATHS.v1.user, middleware, apiV1UserRouter);
};

export const attachPublicRoutes = (app: Application): void => {
    app.get('/', home.destroyRequest);
    app.get('/favicon.ico', home.destroyRequest);
    attachApiV1PublicRoutes(app);
};

export const attachPrivateRoutes = (app: Application, middleware: RequestHandler[]): void => {
    attachApiV1UserRoutes(app, middleware);
};
