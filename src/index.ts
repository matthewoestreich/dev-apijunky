import 'module-alias/register';
import express, { Application, Request, Response } from 'express';
import { Server } from 'http';

const initializeExpress = (callback?: Function): Server => {
    const port: number | string = process.env.PORT || 3000;
    const app: Application = express();

    app.get('/', (req: Request, res: Response): void => {
        res.send('Hello World!');
    });

    const server = app.listen(port, (): void => {
        /* istanbul ignore next */
        if (callback) {
            callback();
        }
    });

    return server;
};

/* istanbul ignore if */
if (require.main === module) {
    initializeExpress();
}

export { initializeExpress };
