import { Router } from 'express';

import {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { authorize, restrictTo } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter
  .route('/')
  .get(authorize, restrictTo('admin'), getUsers)
  .post(createUser);
userRouter
  .route('/:id')
  .get(authorize, getUser)
  .put(authorize, updateUser)
  .delete(authorize, deleteUser);
export default userRouter;
