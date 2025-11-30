import { Router } from 'express';

import {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  getMe,
} from '../controllers/user.controller.js';
import { authorize, restrictTo } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter
  .route('/')
  .get(authorize, restrictTo('admin'), getUsers) // get all users
  .post(authorize, restrictTo('admin'), createUser); // create a new user

userRouter
  .route('/:id')
  .get(authorize, restrictTo('admin'), getUser) // get user by id
  .delete(authorize, restrictTo('admin'), deleteUser) // delete user by id
  .put(authorize, updateUser); // update user by id

userRouter.route('/me').get(authorize, getMe); // get current logged-in user
export default userRouter;
