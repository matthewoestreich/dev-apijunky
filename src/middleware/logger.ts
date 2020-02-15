import { Request, Response, NextFunction, RequestHandler } from 'express';
import c from 'chalk';

import Configuration from 'configuration';
import { DateExtended as FriendlyDate } from 'utils/dateTime';
import { RequestLog } from 'objects';

export const logger = (logEnvVars = false): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const { log } = console;

        let data: RequestLog = {
            ID: req.__reqId,
            TIME: new FriendlyDate(FriendlyDate.now()).toFriendlyDate(),
            HEADERS: req.headers,
            BODY: req.body || {},
            PARAMS: req.params,
        };

        if (logEnvVars) {
            data = { ...data, CONFIG: Configuration };
        }

        log(c.magenta(`\r\n${'*'.repeat(80)}`));
        log(c.yellow('RECEIVED_NEW_REQUEST:'), c.cyan(JSON.stringify(data, null, 2)));
        log(c.magenta(`${'*'.repeat(80)}\r\n`));
        next();
    };
};
