import express, { Router } from "express";
import ClientController from "../controller/ClientController";
import { verifyAccessToken } from "../services/jwt_service";
import uploadCloud from "../config/cloudinary";
const route = express.Router();

route.get("/cancel", ClientController.cancel);
route.get("/success", ClientController.success);
route.get("/changepass", ClientController.getChangePass);
route.get("/profile", ClientController.getProfile);
route.get("/register", ClientController.getUserRegister);
route.get("/login", ClientController.getUserLogin);
route.get("/payment", ClientController.getPayment);
route.post("/payment", ClientController.postPayment)
route.get("/", ClientController.clientView);
module.exports = route;
