import express, { Router } from "express";
import ClientController from "../controller/ClientController";
import { verifyAccessToken } from "../services/jwt_service";
import uploadCloud from "../config/cloudinary";
const route = express.Router();


route.get("/password/reset", ClientController.getForgot);
route.post("/password/email", ClientController.sendResetLinkEmail);

route.get("/password/reset/:email", ClientController.showResetForm);
route.post("/password/reset", ClientController.reset);

route.get("/searchPrice", ClientController.searchprice);
route.get("/searchName", ClientController.searchname);
route.get("/search", ClientController.search);
route.get("/cancel", ClientController.cancel);
route.get("/success", ClientController.success);
route.get("/changepass", ClientController.getChangePass);
route.get("/profile", ClientController.getProfile);
route.get("/register", ClientController.getUserRegister);
route.get("/login", ClientController.getUserLogin);
 route.get("/payment", ClientController.getPayment);
route.get("/wishlist",ClientController.getWishList)
route.get("/cart", ClientController.getCart);
route.post("/payment",verifyAccessToken , ClientController.postPayment)
route.get("/shipping", ClientController.getShipping);
route.get("/product/:productId", ClientController.getProductById);
route.get("/allcategory/:categoryId", ClientController.getAllCategoryById);
route.get("/details/:productId",ClientController.getDetail)
route.get("/order",verifyAccessToken,ClientController.getOrderForUser);
route.get("/orderDetail/:id", ClientController.getOrderDetailForUser);
route.get("/", ClientController.clientView);
module.exports = route;
