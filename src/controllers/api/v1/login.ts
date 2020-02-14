import { Request, Response } from 'express';
import { catchErrors, CustomError } from 'errors';

import { User, JWT } from 'entities';
import { createEntity, findEntityOrThrow } from 'utils/typeorm';
import { signAndEncryptToken } from 'utils/token';

export const logUserInAndReturnToken = catchErrors(async (req: Request, res: Response) => {
    try {
        const foundUser = await findEntityOrThrow(User, { where: { username: req.body.un } });
        const pwValidated = foundUser.validateHash(req.body.pw);

        if (!pwValidated) {
            res.respond(403, '');
        } else {
            const token = signAndEncryptToken({ id: foundUser.id });
            const savedToken = await createEntity(JWT, { token });
            res.respond(200, { token: savedToken.token });
        }
    } catch (error) {
        CustomError.toss('Unable to find user!', {});
    }
});
