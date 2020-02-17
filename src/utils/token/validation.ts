import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { JWT } from 'entities';
import { InvalidTokenError, ExpiredTokenError } from 'errors';
import { findEntityOrThrow, decrypt, removeTokenById } from 'utils';

import Configuration from 'configuration';

export const validateToken = async (token: string): Promise<string | object | void> => {
    try {
        const dbJWT = await findEntityOrThrow(JWT, { where: { token } });
        try {
            const decryptedToken = decrypt(dbJWT.token, Configuration.JWT_ENCRYPTION_KEY);
            const rawToken = jwt.verify(decryptedToken, Configuration.JWT_SIGNING_KEY);

            if (rawToken) {
                return rawToken;
            }

            throw new Error(rawToken);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                await removeTokenById(dbJWT.id);
                throw new ExpiredTokenError();
            }
            throw new InvalidTokenError();
        }
    } catch (error) {
        throw new InvalidTokenError();
    }
};
