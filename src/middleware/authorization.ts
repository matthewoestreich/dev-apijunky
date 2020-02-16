import { Request, Response, NextFunction } from 'express';

import { validateToken } from 'utils';
import { catchErrors, InvalidTokenError } from 'errors';
import { User } from 'entities';

const getAuthTokenFromRequest = (req: Request): string | null => {
    const header = req.get('Authorization') || '';
    const [bearer, token] = header.split(' ');
    return bearer === 'Bearer' && token ? token : null;
};

export const authorizeUser = catchErrors(
    async (req: Request, _res: Response, next: NextFunction) => {
        const token = getAuthTokenFromRequest(req);
        if (!token) {
            throw new InvalidTokenError('Authentication token not found.');
        }

        const userId = await validateToken(token);
        if (!userId) {
            throw new InvalidTokenError('Authentication token is invalid.');
        }

        const user = await User.findOne();
        if (!user) {
            throw new InvalidTokenError('Authentication token is invalid: User not found.');
        }

        // req.currentUser = user;
        next();
    },
);
