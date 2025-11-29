import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import {
  createSubscription,
  getSubscription,
  getSubscriptions,
  getUserSubscriptions,
} from '../controllers/subscription.controller.js';
import { get } from 'mongoose';

const subscriptionRouter = Router();

subscriptionRouter.get('/', getSubscriptions);
subscriptionRouter.get('/:id', getSubscription);
subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
  res.send({ title: `UPDATE subscription with ID: ${req.params.id}` });
});

subscriptionRouter.delete('/:id', (req, res) => {
  res.send({ title: `DELETE subscription with ID: ${req.params.id}` });
});

subscriptionRouter.get('/user/:userId', authorize, getUserSubscriptions);

subscriptionRouter.put('/user/:userId/cancel', (req, res) => {
  res.send({
    title: `CANCEL subscription for user with ID: ${req.params.userId}`,
  });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.send({ title: 'GET upcoming subscription renewals' });
});

export default subscriptionRouter;
