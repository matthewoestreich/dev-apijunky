import { Request, Response } from 'express';
import { catchErrors, CustomError, CreateEntityError } from 'errors';
import { User } from 'entities';

import { createEntity, findEntityOrThrow } from 'utils/typeorm';
import { omit } from 'utils/generic';

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
    try {
        const nu = await createEntity(User, {
            username: req.query.un,
            password: req.query.pw,
        });
        res.respond(200, { ...nu });
    } catch (error) {
        throw new CreateEntityError('User', { ...error });
    }
});

export const findUser = catchErrors(async (req: Request, res: Response) => {
    const fu = await findEntityOrThrow(User, { where: { username: req.query.un } });
    res.respond(200, omit('password', fu));
});

export const validateUserPassword = catchErrors(async (req: Request, res: Response) => {
    try {
        const argsCount = Object.keys(req.query).length;
        if (argsCount === 2 && req.query.un && req.query.pw) {
            const foundUser = await User.findOne({ username: req.query.un });
            if (!foundUser) {
                res.respond(200, { status: false });
            } else {
                res.respond(200, { status: foundUser.validatePassword(req.query.pw) });
            }
        } else {
            res.respond(200, '');
        }
    } catch (error) {
        CustomError.toss('Unable to find user!', {});
    }
});
