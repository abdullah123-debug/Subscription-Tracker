import { Client } from "@upstash/workflow";
import Subscription from "../models/subscriptionSchema.js";

// Token environment variable se lena best practice hai
const workflowClient = new Client({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2OTFkOWQwN2U3NjQxMjdkYjgzMTY4OTciLCJpYXQiOjE3NjM1NDg0MjMsImV4cCI6MTc2NDE1MzIyM30.5P8SDuxAMaAF49oqxGJcact2lebMU_7U_XOEoMjTVF0",
});

export const createSubscription = async (req, res, next) => {
  try {
    const newSubscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // Workflow ka unique name den aur subscriptionId bhejo
    await workflowClient.trigger(
      "http://localhost:5500/api/v1/workflow/subscription/reminder",
      {
        subscriptionId: newSubscription._id.toString(),
      }
    );

    res.status(201).json({
      success: true,
      message: "Subscription created!",
      data: newSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
