import { Request, Response } from 'express';
import { catchErrors, CustomError } from 'errors';
import { User } from 'entities';

import { createEntity, findEntityOrThrow } from 'utils';

export const createTestUser = catchErrors(async (_req: Request, res: Response) => {
    try {
        const newUser = new User();
        newUser.username = 'Test One';
        newUser.password = 'abc123';
        await newUser.save();
        res.respond(200, { status: 'ok' });
    } catch (error) {
        CustomError.toss('Unable to create test user!', {
            debug: error.message,
            id: error.code,
        });
    }
});

export const createNewUser = catchErrors(async (req: Request, res: Response) => {
    const nu = await createEntity(User, {
        username: req.query.un,
        password: req.query.pw,
    });
    res.respond(200, nu.toResponseObject());
});

export const findUser = catchErrors(async (req: Request, res: Response) => {
    const fu = await findEntityOrThrow(User, { where: { username: req.query.un } });
    res.respond(200, fu.toResponseObject());
});
