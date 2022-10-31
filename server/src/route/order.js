import express from "express";
import OrderController from "../controller/OrderController";
const route = express.Router();

route.get("/order", OrderController.orderView);
route.get("/orderdetail/:id", OrderController.orderDetail);
route.get("/shipping", OrderController.shippingView); 

module.exports = route;