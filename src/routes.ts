import express, { Application, RequestHandler } from 'express';

import { API_PATHS } from 'constants/routes';

import * as home from 'controllers/home';
import * as apiV1 from 'controllers/api/v1';

const attachApiV1PublicRoutes = (app: Application): void => {
    /**
     * @routes /api/v1/
     */
    const apiV1PublicRouter = express.Router();

    // POST /api/v1/login
    apiV1PublicRouter.post('/login', apiV1.logUserInAndReturnToken);

    app.use(API_PATHS.v1.root, apiV1PublicRouter);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const attachApiV1UserRoutes = (app: Application, middleware?: RequestHandler[]): void => {
    /**
     * @routes /api/v1/user/
     */
    const apiV1UserRouter = express.Router();

    // GET /api/v1/user/*
    apiV1UserRouter.get('/test', apiV1.test);
    apiV1UserRouter.get('/createtestuser', apiV1.createTestUser);
    apiV1UserRouter.get('/create', apiV1.createNewUser); // ?un=username&pw=password
    apiV1UserRouter.get('/find', apiV1.findUser); // ?un=username
    apiV1UserRouter.get('/validate', apiV1.validateUserPassword); // ?un=username&pw=password

    const routerMiddleware = middleware || [];
    app.use(API_PATHS.v1.user, routerMiddleware, apiV1UserRouter);
};

export const attachPublicRoutes = (app: Application): void => {
    app.get('/', home.sayHelloWorld);
    attachApiV1PublicRoutes(app);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const attachProtectedRoutes = (app: Application, middleware?: RequestHandler[]): void => {
    attachApiV1UserRoutes(app, middleware);
};
