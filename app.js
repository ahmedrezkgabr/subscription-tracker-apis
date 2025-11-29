import express from 'express';
import cookieParser from 'cookie-parser';
// const rateLimit = require('express-rate-limit');

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json({ limit: '10kb' })); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(arcjetMiddleware);

// Route setup
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
// app.use('/api/v1/', indexRouter);
// app.use('/api/v1/categories', categoryRouter);
// app.use('/api/v1/analytics', analyticsRouter);
// app.use('/api/v1/reminders', reminderRouter);
// app.use('/api/v1/payments', paymentRouter);
// app.use('/api/v1/admin', adminRouter);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, async () => {
  console.log(`Subdub API is running on http://localhost:${PORT}`);
  await connectDB();
});

// Global error handlers
process.on('unhandledRejection', (error) => {
  console.log('UNHANLED REJECTION\nSHUTTING DOWN...');
  console.log(error.name, error.message);

  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION\nSHUTTING DOWN...');
  console.log(error.name, error.message);

  process.exit(1);
});

export default app;
