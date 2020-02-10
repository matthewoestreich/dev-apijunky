import { Request, Response, NextFunction } from 'express';
import { RouteNotFoundError } from 'errors';

export const routeNotFound = (req: Request, _res: Response, next: NextFunction): void => {
    next(new RouteNotFoundError(req.originalUrl));
};
