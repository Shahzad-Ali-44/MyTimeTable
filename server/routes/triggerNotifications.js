import express from "express";
const route = express.Router();
import { triggerNotifications } from "../controller/triggerNotifications.js";

route.get("/", triggerNotifications);

export default route;
