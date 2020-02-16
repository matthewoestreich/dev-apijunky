import jwt, { SignOptions } from 'jsonwebtoken';
import { encrypt } from 'utils';

import Configuration from 'configuration';

export const signToken = (payload: string | object | Buffer, options?: SignOptions): string => {
    return jwt.sign(payload, Configuration.JWT_SIGNING_KEY, {
        expiresIn: Configuration.JWT_EXPIRES_IN,
        ...options,
    });
};

export const signAndEncryptToken = (
    payload: string | object | Buffer,
    options?: SignOptions,
): string => {
    if (Configuration.JWT_ENCRYPTION_KEY) {
        const signedToken = signToken(payload, options);
        return encrypt(signedToken, Configuration.JWT_ENCRYPTION_KEY);
    }
    throw Error();
};
