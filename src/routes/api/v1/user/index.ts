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

// This sets the "root prefix" for this router
userRouter.use('/user', userRouter);

/** ======================================================================================================
 *
 * @method POST
 *
 * All POST routes for /api/v1/user go here
 */

// POST /api/v1/user/createtestuser
userRouter.post('/createtestuser', [authorizeUser], userController.createTestUser);

// POST /api/v1/user/create
userRouter.post('/create', [authorizeUser], userController.createNewUser); // ?un=username&pw=password

// POST /api/v1/user/find
userRouter.post('/find', [authorizeUser], userController.findUser); // ?un=username
// =======================================================================================================

/** ======================================================================================================
 *
 * @method GET
 *
 * All GET routes for /api/v1/user go here
 */

// GET /api/v1/user/test
userRouter.get('/test', [authorizeUser], userController.test);
// =======================================================================================================

export default userRouter;
