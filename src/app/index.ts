import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';

import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import {
    routeNotFound,
    handleError,
    addRespondToResponse,
    addIdToRequest,
    // authorizeUser,
    logger,
} from 'middleware';

import createDatabaseConnection from 'database/createConnection';
import { attachPublicRoutes, attachApiRoutes } from 'routes';
import Configuration from 'configuration';
import { autoRemoveExpiredTokens } from 'utils';

const initializeExpress = (shouldLog = false): Server => {
    // Initialize our configuration
    // This checks for empty env variables
    Configuration.init();

    // Checks for expired tokens, and auto removes them
    // Time is in minutes
    autoRemoveExpiredTokens(10);

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(helmet());
    app.use(compression());
    app.use(addIdToRequest);
    app.use(addRespondToResponse);
    app.use(logger(shouldLog));

    attachPublicRoutes(app);
    attachApiRoutes(app);

    // This is for publishing apidocs documentation
    app.use(express.static('dist/public'));

    app.use(routeNotFound);
    app.use(handleError);

    const server = app.listen(process.env.PORT || Configuration.HOST_PORT, (): void => {
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

export default initializeExpress;
