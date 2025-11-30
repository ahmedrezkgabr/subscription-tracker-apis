import jwt from 'jsonwebtoken';

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
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      const error = new Error('Not authorized to access this route');
      error.statusCode = 401;
      throw error;
    }

    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // check if the user still exists & attach user to req object
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: 'Unauthorized', error: error.message });
  }
};
