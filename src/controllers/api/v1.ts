import { Request, Response } from 'express';
import { catchErrors, CustomError } from 'errors';
import { User } from 'entities';

export const test = catchErrors((_req: Request, res: Response) => {
    res.respond(200, 'Test');
});

export const createTestUser = catchErrors(async (_req: Request, res: Response) => {
    try {
        const newUser = new User();
        newUser.username = 'Test One';
        newUser.password = 'abc123';
        newUser.email = 'test.one@gmail.com';
        await newUser.save();
        res.respond(200, { status: 'ok' });
    } catch (error) {
        CustomError.toss('Unable to create test user!', {
            debug: error.message,
            id: error.code,
        });
    }
});

export const createNewUser = catchErrors((req: Request, res: Response) => {
    try {
        const len = req.query.length;
        res.respond(200, { queryLen: len });
    } catch (error) {
        CustomError.toss('Unable to create user!', {
            debug: error.message,
            id: error.code,
        });
    }
});
