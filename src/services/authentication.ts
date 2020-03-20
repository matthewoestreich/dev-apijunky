import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms';
import { red, yellow } from 'chalk';

import { asyncCatch, BadRequest } from 'errors';
import { User, JWT } from 'database/entities';
import Encryptr from 'classes/Encryptr';
import { addMillisecondsToDate } from 'utils';
// import { deleteItem } from 'services/redis';

import Configuration from 'configuration';

/*
class UserLogin {
    private _signedToken: string | Record<string, unknown> | Buffer;

}
*/

const signToken = (payload: string | object | Buffer, options?: SignOptions): string => {
    return jwt.sign(payload, Configuration.JWT_SIGNING_KEY, {
        expiresIn: Configuration.JWT_EXPIRES_IN,
        ...options,
    });
};

const signAndEncryptToken = (payload: string | object | Buffer, options?: SignOptions): string => {
    if (Configuration.JWT_ENCRYPTION_KEY) {
        const signedToken = signToken(payload, options);
        return Encryptr.encrypt(signedToken, Configuration.JWT_ENCRYPTION_KEY);
    }
    throw Error();
};

/**
 * Authenticates user and returns a token.  If something goes wrong, like a user is not found
 * etc... then an error is thrown.
 */
export const loginAndGetToken = asyncCatch(async (req: Request, res: Response) => {
    //
    // TODO: build a check to make sure token does not exist already before trying to create one
    //

    if (!req.bodyParametersExist(['un', 'pw'])) {
        throw new BadRequest({ malformedBody: req.body });
    }

    try {
        const foundUser = await User.findOneOrFail({ where: { username: req.body.un } });

        const pwValidated = foundUser.validatePassword(req.body.pw);
        if (!pwValidated) {
            throw new Error();
        }

        const token = signAndEncryptToken({ id: foundUser.id });
        if (!token) {
            throw new Error('Invalid user.');
        }

        const validFor = ms(Configuration.JWT_EXPIRES_IN || '10 minutes');
        const expires = addMillisecondsToDate(new Date(Date.now()), validFor);

        // Remove existing token before updating with new token
        if (foundUser.jwt) {
            // deleteItem(foundUser.jwt.token);
            foundUser.jwt.remove();
        }
        // Add new token to User
        foundUser.jwt = new JWT(token, expires, foundUser);

        const updatedUser = await foundUser.save();
        if (!updatedUser.jwt.token) {
            throw new Error('Internal error. Contact support.');
        }

        return res.respond(200, updatedUser.jwt.token);
    } catch (error) {
        console.trace(yellow(error));
        console.log();
        console.log(red(error));
        return res.respond(401, new BadRequest({ invalidRequest: true }));
    }
});
