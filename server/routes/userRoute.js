import express from "express";
import { signup, login } from "../controller/userController.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);


export default route;