import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

// wrapper function to return middleware function we want
export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles is an array i.e ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new Error('You do not have permission to perform this action', 403)
      );
    }
    next();
  };

export const authorize = async (req, res, next) => {
  try {
    let token;

    // Extract Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided',
      });
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
    const { id } = decoded.id;
    const currentUser = await User.findById(id);
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // Attach the user object to req
    req.user = currentUser;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
      error: error.message,
    });
  }
};
