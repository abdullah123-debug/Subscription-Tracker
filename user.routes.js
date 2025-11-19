import Router from "express";
import authorize from "../middleware/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/:id", (req, res) =>
  res.send({ titel: "Create user details" })
);
userRouter.put("/:id", (req, res) => res.send({ titel: "Upate user details" }));
userRouter.delete("/:id", (req, res) =>
  res.send({ titel: "GET user details" })
);

export default userRouter;
