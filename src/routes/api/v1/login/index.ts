import { Router } from 'express';

import * as loginController from 'controllers/api/v1/login';

const loginRouter = Router();

/**
 *
 * No need to set a "root prefix" for this router since it will only contain a single route
 *
 */

loginRouter.post('/login', loginController.logUserInAndReturnToken);

export default loginRouter;
