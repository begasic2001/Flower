import express from "express";
import UserController from "../controller/UserController";
import { signAccessToken, verifyAccessToken } from "../services/jwt_service";

const route = express.Router();
route.get("/getlist", verifyAccessToken, UserController.getList);
route.get("/user", UserController.getAllUser);
route.post("/login", UserController.login);
route.put("/update/", UserController.updateUser);
route.get("/getUserEdit/:id", UserController.getUserEdit);
route.delete("/delete/", UserController.deleteUser);
route.post("/register", UserController.register);
route.post("/refresh-token", UserController.refreshToken);
route.delete("/logout", UserController.logout);
module.exports = route;