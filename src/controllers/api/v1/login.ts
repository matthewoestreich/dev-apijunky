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
        throw new BadRequest({ invalidBody: req.body });
    }

    try {
        const foundUser = await findEntityOrThrow(User, { where: { username: req.body.un } });
        const pwValidated = foundUser.validateHash(req.body.pw);

        if (!pwValidated) throw Error();

        const token = signAndEncryptToken({ id: foundUser.id });
        if (!token) throw Error();

        const validFor = ms(Configuration.JWT_EXPIRES_IN);
        if (!validFor) throw Error();

        const expires = addMillisecondsToDate(new Date(Date.now()), validFor);
        if (!expires) throw Error();

        const savedToken = await createEntity(JWT, { token, expires });
        if (!savedToken) throw Error();

        return res.respond(200, { token: savedToken.token });
    } catch (error) {
        return res.respond(401, new BadRequest({ invalidRequest: true }));
    }
});
