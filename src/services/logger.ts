/* eslint-disable max-classes-per-file */
import { Request, Response, RequestHandler } from 'express';

import { createLogger, transports, format, Logger } from 'winston';
import morgan, { TokenIndexer } from 'morgan';

import fs from 'fs';
import path from 'path';

import WinstonLoggerStream from 'classes/WinstonLoggerStream';
import { stripAnsi } from 'utils';

/**
 * Custom `Winston` log format(s)
 */

const winstonAppLoggerColorFormat = format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}][${level}]: ${message}`;
});

const winstonAppLoggerFormat = format.printf(({ level, message, timestamp }) => {
    const str = `${timestamp} ${level}: ${message}`;
    return str.replace(stripAnsi(), '');
});

/**
 * Custom `Morgan` token(s)
 */

morgan.token('headers', (request, _response) => {
    return JSON.stringify({ ...request.headers });
});

morgan.token('body', (request, _response) => {
    return JSON.stringify({ ...request.body });
});

morgan.token('query', (request, _response) => {
    return JSON.stringify({ ...request.query });
});

morgan.token('requestId', (request, _response) => {
    return request.__reqId;
});

/**
 * Custom `Morgan` format(s)
 */

const jsonFormat = (tokens: TokenIndexer, req: Request, res: Response): string => {
    const head = tokens.headers(req, res) ?? '';
    const bod = tokens.body(req, res) ?? '';
    const qry = tokens.query(req, res) ?? '';

    return JSON.stringify({
        requestId: tokens.requestId(req, res),
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

/**
 * Helper methods
 */

/**
 * This method will create the 'parent' directory to a file if it does not exist.
 *
 * For example, if you specify the path /home/stuff/file.txt and the directory
 * 'stuff' does not exist, this method will create it. This ensures the directory
 * exists before we try to create a file.
 *
 * @param pathToFile {String} Path to a FILE! (not directory)
 */
const createDirectoryInFilePathIfNotExist = (pathToFile: string): void => {
    try {
        const logFileDirectory = path.dirname(pathToFile);
        fs.mkdirSync(path.resolve(__dirname, logFileDirectory));
    } catch (error) {
        // If the 'parent' directory already exists, it will throw an error.
        // If we receive the 'EEXIST' error, we just silence it.
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
};

/**
 * Classes
 */

/**
 * Returns an instance of `morgan` middleware
 */
class RequestLogger {
    static new = (logFilePath: string): RequestHandler => {
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
}

/**
 * This class creates a generic logger to be used across the application.
 *
 * If you do not set a log file then the default `Winston` logger is used
 * and nothing is logged to file.
 */
class ApplicationLogger {
    public log: Logger;

    constructor() {
        this.log = createLogger({
            transports: [new transports.Console()],
        });
    }

    setLogFile = (logFilePath: string): void => {
        createDirectoryInFilePathIfNotExist(logFilePath);

        this.log = createLogger({
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
    };
}

// We create an instance of ApplicationLogger so that we can use it
// accross our app.
// We set the log file path using `.setLogFile(...)` in 'src/app.ts'.
const AppLogger = new ApplicationLogger();

export { RequestLogger, AppLogger };
