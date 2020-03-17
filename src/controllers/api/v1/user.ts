import { Request, Response } from 'express';
import { asyncCatch, CustomError } from 'errors';
import { User } from 'database/entities';

export const createTestUser = asyncCatch(async (_req: Request, res: Response) => {
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

export const createNewUser = asyncCatch(async (req: Request, res: Response) => {
    const nu = await new User(req.query.un, req.query.pw).save();
    // const nu = await u.save();
    res.respond(200, nu.toResponseObject());
});

export const findUser = asyncCatch(async (req: Request, res: Response) => {
    const fu = await User.findOneOrFail({ where: { username: req.query.un } });
    res.respond(200, fu.toResponseObject());
});

export const test = asyncCatch((_req: Request, res: Response) => {
    res.respond(200, 'Test');
});
