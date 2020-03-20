/**
 * This router handles all /api/v1/user traffic
 * Each destination beyond /api/v1/user goes through here
 */

import { Router } from 'express';

import * as userController from 'controllers/api/v1/user';
import { authorize } from 'services/authorization';

const userRouter = Router();

/**
 * - Set 'root prefix' for this router
 * - Add middleware to this router here, if needed
 */
// userRouter.use('/user', userRouter);

/**
 * @method POST
 * All POST routes for /api/v1/user go here
 */

// POST /api/v1/user/create
userRouter.post('/user/create', userController.createNewUser); // ?un=username&pw=password

// POST /api/v1/user/find
userRouter.post('/user/find', [authorize], userController.findUser);

/**
 * @method GET
 * All GET routes for /api/v1/user go here
 */

// GET /api/v1/user/test
userRouter.get('/user/test', [authorize], userController.test);

export default userRouter;
