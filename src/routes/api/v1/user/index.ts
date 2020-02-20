/**
 *
 * This router handles all /api/v1/user traffic
 *
 * Each destination beyond /api/v1/user goes through here
 *
 */

import { Router } from 'express';

import * as userController from 'controllers/api/v1/user';
import { authorizeUser } from 'middleware';

const userRouter = Router();

/**
 *
 * - Set 'root prefix' for this router
 * - Add middleware to this router here, if needed
 */
userRouter.use('/user', [authorizeUser], userRouter);

/** ======================================================================================================
 *
 * @method POST
 *
 * All POST routes for /api/v1/user go here
 */

// POST /api/v1/user/createtestuser
userRouter.post('/createtestuser', userController.createTestUser);

// POST /api/v1/user/create
userRouter.post('/create', userController.createNewUser); // ?un=username&pw=password

// POST /api/v1/user/find
userRouter.post('/find', userController.findUser); // ?un=username
// =======================================================================================================

/** ======================================================================================================
 *
 * @method GET
 *
 * All GET routes for /api/v1/user go here
 */

// GET /api/v1/user/test
userRouter.get('/test', userController.test);
// =======================================================================================================

export default userRouter;
