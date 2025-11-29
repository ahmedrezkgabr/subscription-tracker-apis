import { Router } from 'express';

import {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);
userRouter
  .route('/:id')
  .get(authorize, getUser)
  .put(authorize, updateUser)
  .delete(authorize, deleteUser);
export default userRouter;
