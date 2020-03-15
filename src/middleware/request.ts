import { Application, RequestHandler, Request, Response, NextFunction } from 'express';

import User from 'database/entities/User';
import { createGuid } from 'utils';

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
        if (expectedParams.length !== bodyKeys.length) {
            return false;
        }

        let result = true;
        expectedParams.forEach(p => {
            if (!bodyKeys.includes(p)) {
                result = false;
            }
        });

        return result;
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
    if (req.rawJwt) {
        const foundUser = await User.findOne({ where: { jwt: { token: req.rawJwt } } });
        if (foundUser) {
            req.user = foundUser;
        }
    }
    const { log } = console;
    log();
    log('[middleware/request.ts][rawJwt]:', req.rawJwt);
    log();
    log('[middleware/request.ts][req.user]:', req.user);
    log();
    log();
    next();
};

/**
 * This method tries to find the JWT from a request, if one is found then it
 * is used on the request object as req.jwt.
 *
 * @param req {express.Request}
 * @param _res {express.Response}
 * @param next {express.NextFunction}
 */
const addJwtToRequest: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
    const header = req.get('Authorization') || '';
    const [bearer, token] = header.split(' ');
    req.rawJwt = bearer === 'Bearer' && token ? token : null;
    next();
};

export const attachRequestExtensionProps = (app: Application): void => {
    app.use(addIdToRequest);
    app.use(addJwtToRequest);
    app.use(addBodyParametersExistToRequest);
    app.use(addUserToRequest);
};
