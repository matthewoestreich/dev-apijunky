import { Request, Response, RequestHandler } from 'express';

import { createLogger, transports, format, Logger } from 'winston';
import morgan, { TokenIndexer } from 'morgan';

import fs from 'fs';
import path from 'path';

import WinstonLoggerStream from 'classes/WinstonLoggerStream';
import { stripAnsi } from 'utils';

const winstonAppLoggerColorFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const winstonAppLoggerFormat = format.printf(({ level, message, timestamp }) => {
    const str = `${timestamp} ${level}: ${message}`;
    return str.replace(stripAnsi(), '');
});

morgan.token('headers', (request, _response) => {
    return JSON.stringify({ ...request.headers });
});

morgan.token('body', (request, _response) => {
    return JSON.stringify({ ...request.body });
});

morgan.token('query', (request, _response) => {
    return JSON.stringify({ ...request.query });
});

const jsonFormat = (tokens: TokenIndexer, req: Request, res: Response): string => {
    const head = tokens.headers(req, res) ?? '';
    const bod = tokens.body(req, res) ?? '';
    const qry = tokens.query(req, res) ?? '';

    return JSON.stringify({
        date: tokens.date(req, res, 'clf'),
        remoteAddress: tokens['remote-addr'](req, res),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        httpVersion: tokens['http-version'](req, res),
        status: tokens.status(req, res),
        contentLength: tokens.res(req, res, 'content-length'),
        referrer: tokens.referrer(req, res),
        userAgent: tokens['user-agent'](req, res),
        responseTimeMs: tokens['response-time'](req, res, 'ms'),
        headers: JSON.parse(head),
        body: JSON.parse(bod),
        query: JSON.parse(qry),
    });
};

const createDirectoryInFilePathIfNotExist = (pathToFile: string): void => {
    try {
        const logFileDirectory = path.dirname(pathToFile);
        fs.mkdirSync(path.resolve(__dirname, logFileDirectory));
    } catch (error) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
};

const makeRequestLogger = (logFilePath: string): RequestHandler => {
    createDirectoryInFilePathIfNotExist(logFilePath);

    const winstonLogger = createLogger({
        level: 'info',
        format: format.combine(format.json(), format.prettyPrint()),
        transports: [
            new transports.Console(),
            new transports.File({
                filename: path.resolve(__dirname, logFilePath),
                maxsize: 20000000, // In bytes: 20mb
            }),
        ],
    });

    const loggerStream = new WinstonLoggerStream(winstonLogger);
    return morgan(jsonFormat, { stream: loggerStream });
};

// eslint-disable-next-line import/no-mutable-exports
let appLogger: Logger;
const makeAppLogger = (logFilePath: string): void => {
    createDirectoryInFilePathIfNotExist(logFilePath);

    const winstonLogger = createLogger({
        transports: [
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.timestamp({ format: 'MM/dd/YYYY hh:mm:ss a' }),
                    winstonAppLoggerColorFormat,
                ),
            }),
            new transports.File({
                filename: path.resolve(__dirname, logFilePath),
                maxsize: 20000000, // In bytes: 20mb
                format: format.combine(
                    format.timestamp({ format: 'MM/dd/YYYY hh:mm:ss a' }),
                    winstonAppLoggerFormat,
                ),
            }),
        ],
    });

    appLogger = winstonLogger;
};

export { makeAppLogger, appLogger };
export default makeRequestLogger;
