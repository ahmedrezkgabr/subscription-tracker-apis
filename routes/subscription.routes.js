import { Router } from 'express';
import { authorize, restrictTo } from '../middlewares/auth.middleware.js';
import {
  createSubscription,
  getSubscription,
  getSubscriptions,
  getUserSubscriptions,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
  getUpcomingRenewals,
} from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

// api/v1/subscriptions/
subscriptionRouter
  .route('/')
  .get(authorize, restrictTo('admin'), getSubscriptions) // get all subscriptions
  .post(authorize, restrictTo('admin'), createSubscription); // create a new subscription

// api/v1/subscriptions/:id (api/v1/subscriptions/12345)
subscriptionRouter
  .route('/:id')
  .get(getSubscription) // get subscription by ID
  .put(updateSubscription) // update subscription by ID
  .delete(deleteSubscription); // delete subscription by ID

// api/v1/subscriptions/user/:userId (api/v1/subscriptions/user/67890)
subscriptionRouter.route('/user/:userId').get(authorize, getUserSubscriptions); // get subscriptions for a specific user

// api/v1/subscriptions/user/:userId/cancel
subscriptionRouter
  .route('/user/:userId/cancel')
  .put(authorize, cancelSubscription); // cancel a user's subscription

// api/v1/subscriptions/upcoming-renewals
subscriptionRouter
  .route('/upcoming-renewals')
  .get(authorize, getUpcomingRenewals); // get upcoming renewals

export default subscriptionRouter;
