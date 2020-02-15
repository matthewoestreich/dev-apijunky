import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';

import { Server } from 'http';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import createDatabaseConnection from 'database/createConnection';
import {
    routeNotFound,
    handleError,
    addRespondToResponse,
    addIdToRequest,
    authenticateUser,
    logger,
} from 'middleware';

import { attachPublicRoutes, attachProtectedRoutes } from 'routes';

const initializeExpress = (): Server => {
    const app: Application = express();

    // Adds an id to each request, accessable as req.__reqId
    app.use(addIdToRequest);

    // Log each request we get to console
    app.use(logger());

    // This is for publishing the apidocs package documentation
    app.use(express.static('dist/public'));

    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(addRespondToResponse);

    attachPublicRoutes(app);
    attachProtectedRoutes(app, [authenticateUser]);

    app.use(routeNotFound);
    app.use(handleError);

    const server = app.listen(process.env.PORT || 3000, (): void => {
        (async (): Promise<void> => {
            try {
                await createDatabaseConnection();
            } catch (err) /* istanbul ignore next */ {
                console.log(err);
                server.close();
            }
        })();
    });

    return server;
};

const server: Server = initializeExpress();

export { server };
