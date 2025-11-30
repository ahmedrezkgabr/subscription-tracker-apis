import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV } from '../config/env.js';

import User from '../models/user.model.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken({ id: user._id }, JWT_SECRET);

  const cookieOptions = {
    expires: new Date(Date.now() + JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signUp = async (req, res, next) => {
  // start a mongoose session for transaction (atomicity)
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // logic to create a new user
    const { name, email, password } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists with this email');
      error.statusCode = 409;
      throw error;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    // generate JWT token
    createSendToken(newUsers[0], 201, res);

    // commit the transaction
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // generate JWT token
    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const singOut = async (req, res, next) => {};
