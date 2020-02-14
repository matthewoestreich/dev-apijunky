import express, { Application, RequestHandler } from 'express';

import { API_PATHS } from 'constants/routes';

import * as home from 'controllers/home';
import * as apiV1 from 'controllers/api/v1';

const attachApiV1PublicRoutes = (app: Application): void => {
    /**
     * @routes /api/v1/
     */
    const apiV1PublicRouter = express.Router();

    /**
     * @api {post} /api/v1/login Login to API
     * @apiVersion 0.0.1
     * @apiName Login
     * @apiGroup api
     *
     * @apiParam {String} un User's username.
     * @apiParam {String} pw User's password.
     *
     * @apiSuccess {Object} token Object with single key, 'token', which contains the Bearer token which must be sent to protected routes.
     *
     * @apiError 401 Returns 401 status on bad authentication request.
     */
    apiV1PublicRouter.post('/login', apiV1.logUserInAndReturnToken);

    app.use(API_PATHS.v1.root, apiV1PublicRouter);
};

const attachApiV1UserRoutes = (app: Application, middleware: RequestHandler[] = []): void => {
    /**
     * @routes /api/v1/user/
     */
    const apiV1UserRouter = express.Router();

    // GET /api/v1/user/*
    apiV1UserRouter.get('/test', apiV1.test);
    apiV1UserRouter.get('/createtestuser', apiV1.createTestUser);
    apiV1UserRouter.get('/create', apiV1.createNewUser); // ?un=username&pw=password
    apiV1UserRouter.get('/find', apiV1.findUser); // ?un=username

    app.use(API_PATHS.v1.user, middleware, apiV1UserRouter);
};

export const attachPublicRoutes = (app: Application): void => {
    app.get('/', home.sayHelloWorld);
    attachApiV1PublicRoutes(app);
};

export const attachProtectedRoutes = (
    app: Application,
    middleware: RequestHandler[] = [],
): void => {
    attachApiV1UserRoutes(app, middleware);
};
