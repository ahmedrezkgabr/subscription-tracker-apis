import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minLength: [2, 'Subscription name must be at least 2 characters long'],
      maxLength: [100, 'Subscription name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    currency: {
      type: String,
      trim: true,
      uppercase: true,
      enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'], // Add more currencies as needed
      default: 'USD',
    },
    frequency: {
      type: String,
      enum: ['monthly', 'yearly', 'weekly', 'daily'],
      default: 'monthly',
    },
    category: {
      type: String,
      enum: ['entertainment', 'productivity', 'education', 'health', 'other'],
      required: [true, 'Category is required'],
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: [true, 'Payment method is required'],
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'canceled'],
      default: 'active',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      validate: {
        validator: (value) => value <= new Date(),
        message: 'Start date cannot be in the future',
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: 'Renewal date must be after the start date',
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    const daysToAdd = renewalPeriods[this.frequency] || 30;
    this.renewalDate = new Date(
      this.startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
    );
  }
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
