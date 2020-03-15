/**
 *
 * No need to set a "root prefix" for this router since it will only contain a single route
 *
 */

import { Router } from 'express';

import * as loginService from 'services/login';
// import * as loginController from 'controllers/api/v1/login';

const loginRouter = Router();

loginRouter.post('/login', loginService.logUserInAndReturnToken);

export default loginRouter;
