import { Request, Response } from 'express';
import ms from 'ms';

import { catchErrors, BadRequest } from 'errors';
import { User, JWT } from 'entities';
import { createEntity, findEntityOrThrow } from 'utils/typeorm';
import { signAndEncryptToken } from 'utils/token';
import { addMillisecondsToDate } from 'utils/general';

import Configuration from 'configuration';

export const logUserInAndReturnToken = catchErrors(async (req: Request, res: Response) => {
    const expectedParamsCount = 2;
    const paramsCount = Object.keys(req.body).length;

    if (paramsCount !== expectedParamsCount || !req.body.un || !req.body.pw) {
        throw new BadRequest({ unnacceptableParams: req.body });
    }

    try {
        const foundUser = await findEntityOrThrow(User, { where: { username: req.body.un } });
        const pwValidated = foundUser.validateHash(req.body.pw);

        if (!pwValidated) throw Error();

        const token = signAndEncryptToken({ id: foundUser.id });
        if (!token) throw Error('Invalid user.');

        const validFor = ms(Configuration.JWT_EXPIRES_IN);
        if (!validFor) throw Error('Corrupt token. [1a]');

        const expires = addMillisecondsToDate(new Date(Date.now()), validFor);
        if (!expires) throw Error('Corrupt token. [1b]');

        const savedToken = await createEntity(JWT, { token, expires });
        if (!savedToken) throw Error('Internal error. Contact support.');

        return res.respond(200, { token: savedToken.token });
    } catch (error) {
        return res.respond(401, new BadRequest({ invalidRequest: error.message }));
    }
});
