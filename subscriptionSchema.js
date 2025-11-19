import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: 2, // typo fix
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription Price is required"], // typo fix
      min: [0, "Price must be greater then 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Yearly"],
      required: true, // add required so frequency always present
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethode: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // Start date must be in the past
          return value < new Date();
        },
        message: "Start Date must be in the past",
      },
    },

    renewalDate: {
      type: Date,
      required: false,
      validate: {
        validator: function (value) {
          // If renewalDate is not set, skip validation (allow null)
          if (!value) return true;
          // Renewal date must be after the start date
          return value > this.startDate;
        },
        message: "Renewal Date must be after Start Date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-calculate the renewal date before saving
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    const freqKey = this.frequency ? this.frequency.toLowerCase() : null;
    if (freqKey && renewalPeriods[freqKey]) {
      this.renewalDate = new Date(this.startDate);
      this.renewalDate.setDate(
        this.renewalDate.getDate() + renewalPeriods[freqKey]
      );
    }
  }

  // Auto update the status if the renewal date has passed
  if (this.renewalDate && this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
