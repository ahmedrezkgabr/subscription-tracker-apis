import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
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

subscriptionRouter.route('/').get(getSubscriptions).post(createSubscription);
subscriptionRouter
  .route('/:id')
  .get(getSubscription)
  .put(updateSubscription)
  .delete(deleteSubscription);
subscriptionRouter.route('/user/:userId').get(authorize, getUserSubscriptions);
subscriptionRouter.route('/user/:userId/cancel').put(cancelSubscription);
subscriptionRouter.route('/upcoming-renewals').get(getUpcomingRenewals);

export default subscriptionRouter;
