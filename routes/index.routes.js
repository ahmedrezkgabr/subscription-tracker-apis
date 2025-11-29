const express = require('express');
const router = express.Router();

/**
 * Master Route Aggregator
 * This file mounts all route modules under their respective base paths.
 * EXAMPLE: /auth/login -> handled by auth.routes.js
 */

// Auth routes
router.use('/auth', require('./auth.routes'));

// User management
router.use('/users', require('./user.routes'));

// Subscriptions
router.use('/subscriptions', require('./subscription.routes'));

// Categories
router.use('/categories', require('./category.routes'));

// Analytics / dashboard insights
router.use('/analytics', require('./analytics.routes'));

// Reminders / notifications
router.use('/reminders', require('./reminder.routes'));

// Payment methods
router.use('/payment-methods', require('./paymentMethod.routes'));

// Admin routes
router.use('/admin', require('./admin.routes'));

/**
 * 404 fallback for unmatched API routes
 * (This helps debugging and API client responses)
 */
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

module.exports = router;
