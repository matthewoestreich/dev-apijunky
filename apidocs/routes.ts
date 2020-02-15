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
 *
 * @apiError 401 Returns 401 status on bad authentication request.
 */

/**
 * @api {post} /api/v1/user/test Test
 * @apiVersion 0.0.1
 * @apiName ApiV1User
 * @apiGroup User
 *
 * @apiHeader {String} Authorization JWT token. Must be in `Bearer token-goes-here` format
 *
 * @apiSuccess {String} Test Returns `Test`.
 *
 * @apiError (401) Bad Request  Returns 401 status on bad authentication request.
 */

/**
 * @api {post} /api/v1/user/createtestuser Create Test User
 * @apiVersion 0.0.1
 * @apiName ApiV1CreateTestUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization JWT token. Must be in `Bearer token-goes-here` format
 *
 * @apiSuccess {Object} user Returns created user object (minus password) This is for testing purposes.
 *
 * @apiError (401) Bad Request  Returns 401 status on bad authentication request.
 */

/**
 * @api {post} /api/v1/user/create Create User
 * @apiVersion 0.0.1
 * @apiName ApiV1CreateUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization JWT token. Must be in `Bearer token-goes-here` format
 *
 * @apiParam {String} un Username of account you want to create.
 * @apiParam {String} pw Password of account you want to create.
 *
 * @apiSuccess {Object} Returns created user object (minus password).
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
 *
 * @apiParam {String} un Username of the user you want to find.
 *
 * @apiSuccess {Object} Returns found user object.
 *
 * @apiError (401) 401 Returns 401 status on bad authentication request.
 */
