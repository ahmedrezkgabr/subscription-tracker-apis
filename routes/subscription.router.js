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

subscriptionRouter.get('/', getSubscriptions);
subscriptionRouter.get('/:id', getSubscription);
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', updateSubscription);
subscriptionRouter.delete('/:id', deleteSubscription);
subscriptionRouter.get('/user/:userId', authorize, getUserSubscriptions);
subscriptionRouter.put('/user/:userId/cancel', cancelSubscription);
subscriptionRouter.get('/upcoming-renewals', getUpcomingRenewals);

export default subscriptionRouter;
