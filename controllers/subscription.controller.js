import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found',
      });
    }
    res.status(200).json({
      success: true,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }
    const subscriptions = await Subscription.find({
      userId: req.params.userId,
    });
    res.status(200).json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
