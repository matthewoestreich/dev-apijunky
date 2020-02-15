import { Request, Response, NextFunction } from 'express';
import c from 'chalk';

import Configuration from 'configuration';

export const logger = (req: Request, _res: Response, next: NextFunction): void => {
    console.log('*'.repeat(80));
    console.log(c.yellow(`NEW REQUEST AT: ${new Date(Date.now())}`));
    console.log(c.cyan('********* HEADERS ********'));
    console.log(req.headers);
    console.log(c.cyan('********* BODY    ********'));
    console.log(req.body);
    console.log(c.cyan('********* PARAMS  ********'));
    console.log(req.params);
    console.log(c.cyan('********* CONFIG  ********'));
    console.log(Configuration.toResponseObject());
    console.log(`${'*'.repeat(80)}\r\n`);
    next();
};
