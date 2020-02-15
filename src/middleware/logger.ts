import { Request, Response, NextFunction, RequestHandler } from 'express';
import c from 'chalk';

import Configuration from 'configuration';

export const logger = (logEnvVars = false): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const { log } = console;

        log('*'.repeat(80));
        log(c.yellow(`NEW REQUEST AT: ${new Date(Date.now())}`));
        log(c.cyan('********* HEADERS ********'));
        log(req.headers);
        log(c.cyan('********* BODY    ********'));
        log(req.body);
        log(c.cyan('********* PARAMS  ********'));
        log(req.params);
        if (logEnvVars) {
            log(c.cyan('********* CONFIG  ********'));
            log(Configuration);
        }
        log(`${'*'.repeat(80)}\r\n`);
        next();
    };
};
