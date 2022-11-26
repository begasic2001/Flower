import express from "express";
import WishlistController from "../controller/WishlistController";
import { verifyAccessToken } from "../services/jwt_service";
const route = express.Router();
//route.get("/getWishList", verifyAccessToken, WishlistController.getWishList);
route.post(
  "/addToWishList/:productId",
  verifyAccessToken,
  WishlistController.addToWishList
);
// route.delete(
//   "/removeWishList/:productId",
//   verifyAccessToken,
//   WishlistController.removeElementWishList
// );
// route.put(
//   "/updateWishList/:productId",
//   verifyAccessToken,
//   WishlistController.updateWishList
// );
// route.delete(
//   "/deleteWishList",
//   verifyAccessToken,
//   WishlistController.deleteWishList
// );
module.exports = route;
