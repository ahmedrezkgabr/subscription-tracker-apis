import express from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import subscriptionRouter from './subscription.routes.js';
const indexRouter = express.Router();

/**
 * Master Route Aggregator
 * This file mounts all route modules under their respective base paths.
 * EXAMPLE: /auth/sign-in -> handled by auth.routes.js
 */

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/subscriptions', subscriptionRouter);

/**
 * 404 fallback for unmatched API routes
 * (This helps debugging and API client responses)
 */
indexRouter.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

export default indexRouter;
