import { Application } from 'express';
import * as home from 'controllers/home';

export const attachPublicRoutes = (app: Application): void => {
    app.get('/', home.SayHelloWorld);
};
