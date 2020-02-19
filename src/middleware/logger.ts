import { Request, Response, NextFunction, RequestHandler } from 'express';
import c from 'chalk';

import Configuration from 'configuration';
import { DateExtended as FriendlyDate } from 'utils';
import { RequestLog } from 'types';

export const logger = (shouldLog = true, logEnvVars = false): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        if (shouldLog) {
            const { log } = console;

            let data: RequestLog = {
                ID: req.__reqId,
                TIME: FriendlyDate.nowToFriendlyDateTime(),
                TO: req.originalUrl,
                HEADERS: req.headers,
                BODY: req.body || {},
                QUERY_PARAMS: req.query,
            };

            if (logEnvVars) {
                data = { ...data, CONFIG: Configuration };
            }

            log(c.magenta(`\r\n${'*'.repeat(80)}`));
            log(c.yellow('RECEIVED_NEW_REQUEST:'), c.cyan(JSON.stringify(data, null, 2)));
            log(c.magenta(`${'*'.repeat(80)}\r\n`));
        }
        next();
    };
};
