const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/env.js');
const User = require('../models/user.model.js');

const authorize = async (req, res, next) => {
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

export default authorize;
