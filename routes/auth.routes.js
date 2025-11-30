import { Router } from 'express';
import { signIn, signUp, singOut } from '../controllers/auth.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';

const authRouter = Router();

// path: /api/v1/auth
authRouter.route('/sign-up').post(signUp);
authRouter.route('/sign-in').post(signIn);
authRouter.route('/sign-out').post(authorize, singOut);

export default authRouter;
