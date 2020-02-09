import 'module-alias/register';
import express, { Application, Request, Response } from 'express';

const port: number | string = process.env.PORT || 3000;
const app: Application = express();

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World!');
});

const server = app.listen(port);

export { server };
