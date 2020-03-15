import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';

import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { autoRemoveExpiredTokens } from 'services/jwt';
import createDatabaseConnection from 'database/createConnection';
import { attachPublicRoutes, attachApiRoutes } from 'routes';
import Configuration from 'configuration';

import {
    routeNotFound,
    handleError,
    attachResponseExtensionProps,
    attachRequestExtensionProps,
    logger,
} from 'middleware';

const initializeExpress = (shouldLog = false): Server => {
    // Initialize our configuration
    // This checks for empty env variables
    Configuration.init();

    // In ms.js format
    autoRemoveExpiredTokens('30 seconds');

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cors());
    app.use(helmet());
    app.use(compression());

    attachRequestExtensionProps(app);
    attachResponseExtensionProps(app);

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
