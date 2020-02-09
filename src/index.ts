import 'module-alias/register';
import { Server } from 'http';
import express, { Application, Request, Response } from 'express';

const initializeExpress = (): Server => {
    const port: number | string = process.env.PORT || 3000;
    const app: Application = express();

    app.get('/', (req: Request, res: Response): void => {
        res.send('Hello World!');
    });

    return app.listen(port);
};

const server: Server = initializeExpress();

let s: string;

// eslint-disable-next-line import/prefer-default-export
export { server };
