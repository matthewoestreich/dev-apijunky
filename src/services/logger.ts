import { Request, Response, NextFunction, RequestHandler, Application } from 'express';

import { createLogger, transports, format } from 'winston';
import morgan, { TokenIndexer } from 'morgan';
import chalk from 'chalk';

import path from 'path';

const orange = chalk.keyword('orange');

const winstonFileLogger = createLogger({
    level: 'info',
    transports: [
        new transports.File({
            filename: path.resolve(__dirname, '../../_logs/logs.log'),
            maxsize: 20000000, // In bytes: 20mb
            format: format.combine(
                format.timestamp({ format: 'MM-YY-DD hh:mm:ssa' }),
                format.json(),
                format.prettyPrint(),
            ),
        }),
    ],
});

const customMorganFormat = (tokens: TokenIndexer, req: Request, res: Response): string => {
    morgan.token('all-headers', (reqq, _ress) => {
        return JSON.stringify(JSON.parse(JSON.stringify(reqq.headers)), null, 2);
    });

    const ref = tokens.referrer(req, res) ?? '-';
    const remoteUser = tokens['remote-user'](req, res) ?? '-';

    return [
        chalk.cyan(tokens['remote-addr'](req, res)),
        '-',
        orange(remoteUser),
        chalk.blue(tokens.date(req, res, 'clf')),
        chalk.magenta(tokens.method(req, res)),
        tokens.url(req, res),
        `HTTP/${tokens['http-version'](req, res)}`,
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        `'referrer: ${ref}'`,
        tokens['user-agent'](req, res),
        `${tokens['response-time'](req, res, 'ms')}ms`,
    ].join(' ');
};

const winstonLogger = (): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        winstonFileLogger.info({
            id: req.__reqId,
            to: req.originalUrl,
            headers: req.headers,
            body: { ...req.body },
            query: req.query,
        });
        next();
    };
};

const attachLogger = (app: Application): void => {
    app.use(morgan(customMorganFormat));
    // app.use(winstonLogger());
};

export default attachLogger;
