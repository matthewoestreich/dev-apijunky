import { Request, Response } from 'express';
import { catchErrors, CustomError } from 'errors';
import { User } from 'entities';

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
        const argsCount = Object.keys(req.query).length;
        if (argsCount === 2 && req.query.un && req.query.pw) {
            const nu = new User();
            nu.username = req.query.un;
            nu.password = req.query.pw;
            await nu.save();
            res.respond(200, { success: true });
        } else {
            CustomError.toss('Incorrect parameter set!', {});
        }
    } catch (error) {
        CustomError.toss('Unable to create user!', {
            debug: error.message,
            id: error.code,
        });
    }
});
