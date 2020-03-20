import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import Encryptr from 'classes/Encryptr';

import { asyncCatch, InvalidTokenError, ExpiredTokenError } from 'errors';

import Configuration from 'configuration';

/**
 * This method returns the decrypted JWT (as a JSON object)
 * ex: { id: 1, iat: 1584632449, exp: 1584637849 }
 *
 * @param token {String} Token to decrypt
 */
const decryptTokenAndVerify = (token: string): string => {
    try {
        const decryptedToken = Encryptr.decrypt(token, Configuration.JWT_ENCRYPTION_KEY);
        return jwt.verify(decryptedToken, Configuration.JWT_SIGNING_KEY) as string;
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            throw new ExpiredTokenError();
        }
        throw new InvalidTokenError();
    }
};

export const authorize = asyncCatch((req: Request, _res: Response, next: NextFunction) => {
    const token = req.jwt;
    if (!token) {
        throw new InvalidTokenError('Authentication token not found.');
    }

    const userId = decryptTokenAndVerify(token);
    if (!userId) {
        throw new InvalidTokenError('Authentication token is invalid.');
    }

    next();
});

export const getTokenFromHeaders = (headers: IncomingHttpHeaders): string | null => {
    const authHeader = headers.authorization || '';
    const [bearer, token] = authHeader.split(' ');
    return bearer === 'Bearer' && token ? token : null;
};
