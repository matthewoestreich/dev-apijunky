import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';

import { Server } from 'http';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import {
    routeNotFound,
    handleError,
    addRespondToResponse,
    addIdToRequest,
    authorizeUser,
    logger,
} from 'middleware';

import createDatabaseConnection from 'database/createConnection';
import { attachPublicRoutes, attachPrivateRoutes } from 'routes';
import Configuration from 'configuration';
import { autoRemoveExpiredTokens } from 'utils';

const initializeExpress = (): Server => {
    // Initialize our configuration
    // This checks for empty env variables
    Configuration.init();

    // Checks for expired tokens, and auto removes them
    // Time is in minutes
    autoRemoveExpiredTokens(10);

    const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(helmet());
    app.use(addIdToRequest);
    app.use(addRespondToResponse);
    app.use(logger());

    // This is for publishing apidocs documentation
    app.use(express.static('dist/public'));

    attachPublicRoutes(app);
    attachPrivateRoutes(app, [authorizeUser]);

    app.use(routeNotFound);
    app.use(handleError);

    const server = app.listen(Configuration.HOST_PORT, (): void => {
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
