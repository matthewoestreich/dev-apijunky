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

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return app.listen(process.env.PORT || 3000, async () => {
        await establishDatabaseConnection();
    });
};

const server: Server = initializeExpress();

export { server };
