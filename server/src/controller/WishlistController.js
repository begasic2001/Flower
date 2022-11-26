import db from "../models/index";
import * as services from "../services/wishlist_service";
// const getWishlist = async (req, res, next) => {
//   try {
//     const userId = req.payLoad.userId;
//     const wishlist = await services.getCart(userId);
//     console.log(cart);
//   } catch (error) {
//     next(error);
//   }
// };

const addToWishList = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.payLoad.userId;
    const Wishlist = await services.addToWishlist(userId, productId);
    // console.log(Wishlist);
  } catch (error) {
    next(error);
  }
};

// const removeElementWishlist = async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const userId = req.payLoad.userId;
//     const cart = await services.removeElementCart(userId, productId);
//     console.log(cart);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateWishlist = async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const userId = req.payLoad.userId;
//     const amount = +req.body.amount;
//     const cart = await services.updateCart(userId, productId, amount);
//     console.log(cart);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteWishlist = async (req, res, next) => {
//   try {
//     const userId = req.payLoad.userId;
//     const cart = await services.destroyCart(userId);
//     console.log(cart);
//   } catch (error) {
//     next(error);
//   }
// };
module.exports = {
  addToWishList,
};
