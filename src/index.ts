import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';

import { Server } from 'http';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import createDatabaseConnection from 'database/createConnection';
import { routeNotFound, handleError } from 'middleware';

import { attachPublicRoutes } from 'routes';

const initializeExpress = (): Server => {
    const app: Application = express();

    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    attachPublicRoutes(app);

    app.use(routeNotFound);
    app.use(handleError);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const server = app.listen(process.env.PORT || 3000, async () => {
        try {
            await createDatabaseConnection();
        } catch (err) {
            console.log(err);
            server.close();
        }
    });

    return server;
};

const server: Server = initializeExpress();

export { server };
