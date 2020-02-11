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

const establishDatabaseConnection = async (): Promise<void> => {
    try {
        await createDatabaseConnection();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const initializeExpress = (): Server => {
    const app: Application = express();

    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    attachPublicRoutes(app);

    app.use(routeNotFound);
    app.use(handleError);

    return app.listen(process.env.PORT || 3000);
};

// eslint-disable-next-line import/no-mutable-exports
let server: Server;

const initializeApp = async (): Promise<void> => {
    await establishDatabaseConnection();
    server = initializeExpress();
};

initializeApp();

export { server };
