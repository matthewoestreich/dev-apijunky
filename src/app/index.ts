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
import { RequestLogger, AppLogger } from 'services/logger';
import createDatabaseConnection from 'database/createConnection';
import { attachPublicRoutes, attachApiRoutes } from 'routes';
import Configuration from 'configuration';

import {
    routeNotFound,
    handleError,
    attachResponseExtensionProps,
    attachRequestExtensionProps,
} from 'middleware';

const initializeExpress = (shouldLog = true): Server => {
    // Initialize our configuration
    // This checks for empty env variables
    Configuration.init();

    // In ms.js format
    autoRemoveExpiredTokensEvery('24 hours');

    const app = express();

    attachRequestExtensionProps(app);
    attachResponseExtensionProps(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    if (shouldLog) {
        AppLogger.setLogFile('../../_logs/app.log');
        app.use(RequestLogger.new('../../_logs/requests.log'));
    }

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
                AppLogger.log.info(
                    green.bold(
                        `\r\n\t\t\t🎉 Successfully connected to database!\t🎉\r\n\t\t\t🎉 Server listening on port '${port}'\t🎉`,
                    ),
                );
            } catch (err) {
                AppLogger.log.error(red(err.stack));
                server.close();
            }
        })();
    });

    return server;
};

export default initializeExpress;
