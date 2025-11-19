import express from "express";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectedToDatabase from "./DATABASE/mongodb.js";
import errorMiddleware from "./middleware/error.handling.js";
import cookieParser from "cookie-parser";
import WorkflowClient from "./routes/workflow.routes.js";

const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/workflows", WorkflowClient);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Subscription Tracker API");
});

app.listen(PORT, async () => {
  console.log(`Server is running on address http://localhost:${PORT}`);
  await connectedToDatabase();
});

export default app;
