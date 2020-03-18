import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';

import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { green, red } from 'chalk';

import { autoRemoveExpiredTokensEvery } from 'services/jwt';
import makeRequestLogger, { makeAppLogger, appLogger } from 'services/logger';
import createDatabaseConnection from 'database/createConnection';
import { attachPublicRoutes, attachApiRoutes } from 'routes';
import Configuration from 'configuration';

import {
    routeNotFound,
    handleError,
    attachResponseExtensionProps,
    attachRequestExtensionProps,
} from 'middleware';

const initializeExpress = (): Server => {
    // Initialize our configuration
    // This checks for empty env variables
    Configuration.init();

    // In ms.js format
    autoRemoveExpiredTokensEvery('10 minutes');

    const app = express();

    attachRequestExtensionProps(app);
    attachResponseExtensionProps(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // In order to use appLogger, import it from 'services/logger';
    // This method creates a logger that is tied to `appLogger` within
    // the logger service.
    makeAppLogger('../../_logs/app.log');
    app.use(makeRequestLogger('../../_logs/requests.log'));

    app.use(cors());
    app.use(helmet());
    app.use(compression());

    attachPublicRoutes(app);
    attachApiRoutes(app);

    // This is for publishing apidocs documentation
    app.use(express.static('dist/public'));

    app.use(routeNotFound);
    app.use(handleError);

    const port = process.env.PORT || Configuration.HOST_PORT;
    const server = app.listen(port, (): void => {
        (async (): Promise<void> => {
            try {
                await createDatabaseConnection();
                appLogger.info(
                    green.bold(
                        `\r\n\t\t\t🎉 Successfully connected to database!\t🎉\r\n\t\t\t🎉 Server listening on port '${port}'\t🎉`,
                    ),
                );
            } catch (err) {
                appLogger.error(red(err.stack));
                server.close();
            }
        })();
    });

    return server;
};

export default initializeExpress;
