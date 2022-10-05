import express from "express";
import UserController from "../controlller/UserController";
import { signAccessToken, verifyAccessToken } from "../services/jwt_service";

const route = express.Router();
route.get("/getlist", verifyAccessToken, UserController.getList);
route.post("/login", UserController.login);
route.post("/register", UserController.register);
route.post("/refresh-token", UserController.refreshToken);
route.delete("/logout", UserController.logout);
module.exports = route;
