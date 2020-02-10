import 'module-alias/register';
import { Server } from 'http';
import express, { Application } from 'express';

import { routeNotFound, handleError } from 'middleware';

import { attachPublicRoutes } from 'routes';

const initializeExpress = (): Server => {
    const port: number | string = process.env.PORT || 3000;
    const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));    

    attachPublicRoutes(app);

    app.use(routeNotFound);
    app.use(handleError);

    return app.listen(port);
};

const server: Server = initializeExpress();

export { server };
