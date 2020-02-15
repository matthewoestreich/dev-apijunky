import { Request, Response, NextFunction, RequestHandler } from 'express';
import c from 'chalk';

import Configuration from 'configuration';

export const logger = (logEnvVars = false): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        console.log('*'.repeat(80));
        console.log(c.yellow(`NEW REQUEST AT: ${new Date(Date.now())}`));
        console.log(c.cyan('********* HEADERS ********'));
        console.log(req.headers);
        console.log(c.cyan('********* BODY    ********'));
        console.log(req.body);
        console.log(c.cyan('********* PARAMS  ********'));
        console.log(req.params);
        if (logEnvVars) {
            console.log(c.cyan('********* CONFIG  ********'));
            console.log(Configuration.toResponseObject());
        }
        console.log(`${'*'.repeat(80)}\r\n`);
        next();
    };
};
