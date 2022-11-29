import express from "express";
import ClientController from "../controller/ClientController";
import { verifyAccessToken } from "../services/jwt_service";
import uploadCloud from "../config/cloudinary";
const route = express.Router();


route.get("/changepass", ClientController.getChangePass);
route.get("/profile", ClientController.getProfile);
route.get("/register", ClientController.getUserRegister);
route.get("/login", ClientController.getUserLogin);
route.get("/", ClientController.clientView);

module.exports = route;
