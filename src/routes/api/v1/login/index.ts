/**
 *
 * No need to set a "root prefix" for this router since it will only contain a single route
 *
 */

import { Router } from 'express';

import * as authenticationService from 'services/authentication';
// import * as loginController from 'controllers/api/v1/login';

const loginRouter = Router();

loginRouter.post('/login', authenticationService.loginAndGetToken);

export default loginRouter;
