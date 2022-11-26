import express from "express";
import ClientController from "../controller/ClientController";
import uploadCloud from "../config/cloudinary";
const route = express.Router();

route.get("/register", ClientController.getUserRegister);
route.get("/login", ClientController.getUserLogin);
route.get("/", ClientController.clientView);

module.exports = route;
