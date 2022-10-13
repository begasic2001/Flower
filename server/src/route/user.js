import express from "express";
import UserController from "../controller/UserController";
import { signAccessToken, verifyAccessToken } from "../services/jwt_service";

const route = express.Router();
route.get("/getlist", verifyAccessToken, UserController.getList);
route.post("/login", UserController.login);
route.put("/update/:id", UserController.updateUser);
route.delete("/delete/:id", UserController.deleteUser);
route.post("/register", UserController.register);
route.post("/refresh-token", UserController.refreshToken);
route.delete("/logout", UserController.logout);
module.exports = route;