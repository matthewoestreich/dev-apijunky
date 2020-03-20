import { Application, RequestHandler, Request, Response, NextFunction } from 'express';

import { createGuid } from 'utils';
import { JWT } from 'database/entities';
import { getTokenFromHeaders } from 'services/authorization';
// import * as redis from 'services/redis';

const addIdToRequest: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
    const dateTime = Date.now();
    const guid = createGuid();
    req.__reqId = `${dateTime}.${guid}`;
    next();
};

/**
 * This method allows you to easily validate the 'shape' of the request body.
 *
 * For example, if you are expecting a body with the following shape:
 *     { one: someValue, two: anotherValue }
 * then you can easily verify that the keys 'one' and 'two' exist on the body
 * by doing:
 *     req.bodyParametersExist(['one', 'two']); // -> boolean
 *
 * @param req {express.Request}
 * @param _res {express.Response}
 * @param next {express.NextFunction}
 */
const addBodyParametersExistToRequest: RequestHandler = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    req.bodyParametersExist = (expectedParams: string[]): boolean => {
        const bodyKeys = Object.keys(req.body);
        return (
            expectedParams.length === bodyKeys.length &&
            bodyKeys.every(item => expectedParams.includes(item))
        );
    };
    next();
};

/**
 * If a request has a body with a 'un' parameter, this method will search
 * our database for that user and add it as a property on the request object.
 *
 * @param req {express.Request}
 * @param _res {express.Response}
 * @param next {express.NextFunction}
 */
const addUserToRequest: RequestHandler = async (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const token = getTokenFromHeaders(req.headers);
    if (token) {
        const existingJwt = await JWT.findOne({ where: { token }, relations: ['user'] });
        req.jwt = existingJwt?.user?.jwt.token ?? null;
    }
    next();
    /*
    const token = getTokenFromHeaders(req.headers);
    let foundToken = null;

    if (token) {
        const cachedToken = await redis.getUser(token);
        if (cachedToken) {
            console.log('cachedToken', cachedToken);
            foundToken = token;
        } else {
            const result = await redis.saveUser(token);
            console.log('result', result);
            const existingJwt = await JWT.findOne({ where: { token }, relations: ['user'] });
            foundToken = existingJwt?.user?.jwt.token ?? null;
        }
    }

    req.jwt = foundToken;
    next();
    */
};

export const attachRequestExtensionProps = (app: Application): void => {
    app.use(addIdToRequest);
    app.use(addBodyParametersExistToRequest);
    app.use(addUserToRequest);
};
