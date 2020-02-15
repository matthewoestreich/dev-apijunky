/**
 * @apiDefine authHeaderExample
 * @apiHeaderExample {json} Authorization Header:
 *     {
 *       "Authorization": "Bearer y0ur_JWT_t0k3n"
 *     }
 */

/**
 * @apiDefine userSuccess
 * @apiSuccess {String} id Id of the User.
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} createdAt Date when the User was created.
 * @apiSuccess {String} updatedAt Date when the User was last updated.
 */

/**
 * @apiDefine userSuccessResponseExample
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 1,
 *         "username": "xx.john.doe.xx",
 *         "createdAt": "1970-01-01T16:32:34.650Z",
 *         "updatedAt": "1980-01-01T16:32:34.650Z"
 *     }
 */

/**
 * @api {post} /api/v1/login Authentication
 * @apiVersion 0.0.1
 * @apiName Authentication
 * @apiGroup Getting Started
 *
 * @apiParam {String} un User's username.
 * @apiParam {String} pw User's password.
 *
 * @apiSuccess {Object} token Object with single key, 'token', which contains the Bearer token which must be sent to protected routes.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "token": "s0m3_jwT_t0k3n"
 *     }
 *
 * @apiError (401) 401 Returns 401 status on bad authentication request.
 */

/**
 * @api {post} /api/v1/user/test Test
 * @apiVersion 0.0.1
 * @apiName ApiV1User
 * @apiGroup User
 *
 * @apiHeader {String} Authorization JWT token. Must be in `Bearer token-goes-here` format
 * @apiUse authHeaderExample
 *
 * @apiSuccess {String} Test Returns `Test`.
 *
 * @apiError (401) 401 Returns 401 status on bad authentication request.
 */

/**
 * @api {post} /api/v1/user/createtestuser Create Test User
 * @apiVersion 0.0.1
 * @apiName ApiV1CreateTestUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization JWT token. Must be in `Bearer token-goes-here` format
 * @apiUse authHeaderExample
 *
 * @apiUse userSuccess
 * @apiUse userSuccessResponseExample
 *
 * @apiError (401) 401 Returns 401 status on bad authentication request.
 */

/**
 * @api {post} /api/v1/user/create Create User
 * @apiVersion 0.0.1
 * @apiName ApiV1CreateUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization JWT token. Must be in `Bearer token-goes-here` format
 * @apiUse authHeaderExample
 *
 * @apiParam {String} un Username of account you want to create.
 * @apiParam {String} pw Password of account you want to create.
 *
 * @apiUse userSuccess
 * @apiUse userSuccessResponseExample
 *
 * @apiError (401) 401 Returns 401 status on bad authentication request.
 */

/**
 * @api {post} /api/v1/user/find Find User
 * @apiVersion 0.0.1
 * @apiName ApiV1FindUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization JWT token. Must be in `Bearer token-goes-here` format
 * @apiUse authHeaderExample
 *
 * @apiParam {String} un Username of the user you want to find.
 *
 * @apiUse userSuccess
 * @apiUse userSuccessResponseExample
 *
 * @apiError (401) 401 Returns 401 status on bad authentication request.
 */
