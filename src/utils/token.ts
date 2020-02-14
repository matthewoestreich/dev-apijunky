import jwt, { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { encrypt, decrypt } from 'utils/encryptor';

import { JWT } from 'entities';
import { InvalidTokenError } from 'errors';

const removeExpiredToken = async (token: string): Promise<boolean> => {
    const t = await JWT.findOne({ token });
    if (!t) return false;
    JWT.delete(t.id);
    return true;
};

export const signAndEncryptToken = (
    payload: string | object | Buffer,
    options?: SignOptions,
): string => {
    const signedToken = jwt.sign(payload, process.env.JWT_SIGNING_KEY || '', {
        expiresIn: '10m',
        ...options,
    });
    return encrypt(signedToken, process.env.JWT_ENCRYPTION_KEY || '');
};

export const verifyToken = async (token: string): Promise<string | object | void> => {
    try {
        const decryptedToken = decrypt(token, process.env.JWT_ENCRYPTION_KEY || '');
        const rawToken = jwt.verify(decryptedToken, process.env.JWT_SIGNING_KEY || '');

        if (rawToken) {
            return rawToken;
        }

        throw new Error(rawToken);
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            await removeExpiredToken(token);
        }
        throw new InvalidTokenError();
    }
};
