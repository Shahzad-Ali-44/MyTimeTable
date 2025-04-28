import express from "express";
import { authenticateUser } from '../middleware/authMiddleware.js';
import { notification } from "../controller/notificationController.js";
const route = express.Router();
route.use(authenticateUser);
route.post('/notification-token', notification);
export default route;