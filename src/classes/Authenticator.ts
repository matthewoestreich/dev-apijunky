/*
import Encryptr from 'classes/Encryptr';

export default class Authenticator {
    public Token: string;

    public Key: string;

    constructor(token: string, key: string) {
        this.Token = token;
        this.Key = key;
    }

    validate = async (): Promise<string | object | void> => {
        try {
            const dbJWT = await findEntityOrThrow(JWT, { where: { token } });
            try {
                const decryptedToken = Encryptr.decrypt(dbJWT.token, Configuration.JWT_ENCRYPTION_KEY);
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
}
*/
