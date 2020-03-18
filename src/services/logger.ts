import { Request, Response, RequestHandler } from 'express';

import winston, { createLogger, transports, format } from 'winston';
import morgan, { TokenIndexer } from 'morgan';

import path from 'path';

import LoggerStream from 'classes/LoggerStream';

morgan.token('headers', (request, _response) => {
    return JSON.stringify(request.headers);
});

morgan.token('body', (request, _response) => {
    return JSON.stringify({ ...request.body });
});

const jsonFormat = (tokens: TokenIndexer, req: Request, res: Response): string => {
    const head = tokens.headers(req, res) ?? '';
    const bod = tokens.body(req, res) ?? '';

    return JSON.stringify(
        {
            date: tokens.date(req, res, 'clf'),
            remoteAddress: tokens['remote-addr'](req, res),
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            httpVersion: `HTTP/${tokens['http-version'](req, res)}`,
            status: tokens.status(req, res),
            contentLength: tokens.res(req, res, 'content-length'),
            referrer: tokens.referrer(req, res),
            userAgent: tokens['user-agent'](req, res),
            responseTime: `${tokens['response-time'](req, res, 'ms')}ms`,
            headers: JSON.parse(head),
            body: JSON.parse(bod),
        },
        // null,
        // 2,
    );
};

const makeLogger = (logFilePath: string): RequestHandler => {
    const winstonLogger = createLogger({
        level: 'info',
        format: format.combine(format.json(), format.prettyPrint()),
        transports: [
            new transports.Console(),
            new winston.transports.File({
                filename: path.resolve(__dirname, logFilePath),
                maxsize: 20000000, // In bytes: 20mb
            }),
        ],
    });

    const loggerStream = new LoggerStream(winstonLogger);
    return morgan(jsonFormat, { stream: loggerStream });
};

export default makeLogger;
