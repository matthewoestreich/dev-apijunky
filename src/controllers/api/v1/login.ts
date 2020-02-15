import { Request, Response } from 'express';
import ms from 'ms';

import { catchErrors } from 'errors';
import { User, JWT } from 'entities';
import { createEntity, findEntityOrThrow } from 'utils/typeorm';
import { signAndEncryptToken } from 'utils/token';
import { addMillisecondsToDate } from 'utils/general';

import Configuration from 'configuration';

export const logUserInAndReturnToken = catchErrors(async (req: Request, res: Response) => {
    try {
        const foundUser = await findEntityOrThrow(User, { where: { username: req.body.un } });
        const pwValidated = foundUser.validateHash(req.body.pw);

        if (!pwValidated) {
            throw Error();
        }

        const token = signAndEncryptToken({ id: foundUser.id });
        const validFor = ms(Configuration.JWT_EXPIRES_IN);
        const expires = addMillisecondsToDate(new Date(Date.now()), validFor);
        const savedToken = await createEntity(JWT, { token, expires });
        return res.respond(200, { token: savedToken.token });
    } catch (error) {
        return res.respond(401, {});
    }
});
