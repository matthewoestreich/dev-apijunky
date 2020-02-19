/**
 *
 * This router handles all /api/v1/user traffic
 *
 * Each destination beyond /api/v1/user goes through here
 *
 */
import { Router } from 'express';

const apiVersionOneUserRouter = Router();

const placeholder = (): null => {
    return null;
};

/**
 * @method POST
 *
 * All POST routes for /api/v1/user go here
 */
/** @route POST /api/v1/user/test */
apiVersionOneUserRouter.post('/test', placeholder);
/** @route POST /api/v1/user/createtestuser */
apiVersionOneUserRouter.post('/createtestuser', placeholder);
/** @route POST /api/v1/user/create */
apiVersionOneUserRouter.post('/create', placeholder); // ?un=username&pw=password
/** @route POST /api/v1/user/find */
apiVersionOneUserRouter.post('/find', placeholder); // ?un=username

export default apiVersionOneUserRouter;
