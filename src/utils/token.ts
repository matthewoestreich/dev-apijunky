import jwt, { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { encrypt, decrypt } from 'utils/encryptor';

import { JWT } from 'entities';
import { InvalidTokenError } from 'errors';
import { deleteEntity, findEntityOrThrow } from 'utils/typeorm';

import Configuration from 'configuration';

const removeExpiredToken = async (id: number | string): Promise<boolean> => {
    try {
        await deleteEntity(JWT, { where: { id } });
        return true;
    } catch {
        return false;
    }
};

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

export const verifyToken = async (token: string): Promise<string | object | void> => {
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
            await removeExpiredToken(dbJWT.id);
        }
        throw new InvalidTokenError();
    }
};
