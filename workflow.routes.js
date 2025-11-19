import express from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = express.Router();

workflowRouter.post("/subscription/reminder", sendReminders);

export default workflowRouter;
