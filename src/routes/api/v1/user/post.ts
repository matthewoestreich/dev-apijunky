/**
 * **********************************************************************************
 *       TODO: Possibly separate each 'final level' route into REST methods?
 *
 *       example: /routes/api/v1/user/post.ts [for all post paths]
 *                /routes/api/v1/user/post.ts [for all GET paths]
 *                ..etc...
 * **********************************************************************************
 *
 * import { Router } from 'express';
 *
 * const placeholder = (): null => {
 *     return null;
 * };
 *
 * export const attachUserPostRoutes = (router: Router): void => {
 *     router.post('/test', placeholder);
 *     router.post('/createtestuser', placeholder);
 *     router.post('/create', placeholder); // ?un=username&pw=password
 *     router.post('/find', placeholder); // ?un=username
 * };
 *
 */
