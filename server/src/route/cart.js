import express from "express";
import CartController from "../controller/CartController";
import { verifyAccessToken } from "../services/jwt_service";
const route = express.Router();
route.get("/getCart", verifyAccessToken, CartController.getCart);
route.post("/addToCart", verifyAccessToken, CartController.addToCart);
route.delete("/removeCart", verifyAccessToken, CartController.removeElementCart);
route.delete("/deleteCart", verifyAccessToken, CartController.deleteCart);
module.exports = route;