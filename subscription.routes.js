import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.Controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => ({
  title: "GET All Details",
}));

subscriptionRouter.get("/:id", (req, res) => ({
  title: "GET Subscription Details",
}));

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => ({
  title: "Update Subscription Details",
}));

subscriptionRouter.delete("/:id", (req, res) => ({
  title: "Delete Subscription Details",
}));

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.put("/id/cancel", (req, res) =>
  res.send({ title: "Cancel Subscription" })
);
subscriptionRouter.put("/upcoming-renewals", (req, res) =>
  res.send({ title: "Get upcoming renewals" })
);
export default subscriptionRouter;
