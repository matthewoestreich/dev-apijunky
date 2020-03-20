import { Request, Response } from 'express';
import { asyncCatch, EntityNotFoundError } from 'errors';
import { User } from 'database/entities';

export const createNewUser = asyncCatch(async (req: Request, res: Response) => {
    req.bodyParametersExist(['un', 'pw']);
    const nu = await new User(req.body.un, req.body.pw).save();
    res.respond(200, nu.toResponseObject());
});

export const findUser = asyncCatch(async (req: Request, res: Response) => {
    req.bodyParametersExist(['un']);
    const fu = await User.findOne({ where: { username: req.body.un } });
    if (!fu) {
        throw new EntityNotFoundError('Entity');
    }
    res.respond(200, fu.toResponseObject());
});

export const test = asyncCatch((_req: Request, res: Response) => {
    res.respond(200, 'Test');
});
