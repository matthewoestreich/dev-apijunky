import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';

import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { autoRemoveExpiredTokensEvery } from 'services/jwt';
import makeLogger from 'services/logger';
import createDatabaseConnection from 'database/createConnection';
import { attachPublicRoutes, attachApiRoutes } from 'routes';
import Configuration from 'configuration';

import {
    routeNotFound,
    handleError,
    attachResponseExtensionProps,
    attachRequestExtensionProps,
    // logger,
} from 'middleware';

const initializeExpress = (): Server => {
    // Initialize our configuration
    // This checks for empty env variables
    Configuration.init();

    // In ms.js format
    autoRemoveExpiredTokensEvery('1 hour');

    const app = express();

    attachRequestExtensionProps(app);
    attachResponseExtensionProps(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(makeLogger('../../_logs/logs.log'));

    app.use(cors());
    app.use(helmet());
    app.use(compression());

    // This is the 'old' console.log logger
    // app.use(logger(shouldLog));

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
