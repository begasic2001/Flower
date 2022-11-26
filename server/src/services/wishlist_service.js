import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;
const getWishlist = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Wishlist = await db.sequelize.query(`EXEC sp_getWishlist :CUS `, {
        replacements: {
          CUS: userId,
        },
      });
      resolve(Wishlist[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const addToWishlist = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(userId)
      console.log(productId)
      // const Wishlist = await db.sequelize.query(
      //   `EXEC sp_AddToWishlist :CUS , :ITEM , :AMOUNT`,
      //   {
      //     replacements: {
      //       CUS: userId,
      //       ITEM: productId,
      //       AMOUNT: 1,
      //     },
      //   }
      // );
      // resolve(Wishlist[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const removeElementWishlist = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_removeElementWishlist :CUS , :ITEM `,
        {
          replacements: {
            CUS: userId,
            ITEM: productId,
          },
        }
      );
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateWishlist = (userId, productId, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_updateWishlist :CUS , :ITEM , :AMOUNT`,
        {
          replacements: {
            CUS: userId,
            ITEM: productId,
            AMOUNT: amount,
          },
        }
      );
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} Wishlist updated`
            : "Cannot update new Wishlist/ Wishlist ID not found",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const destroyWishlist = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(`EXEC sp_destroyWishlist :CUS  `, {
        replacements: {
          CUS: userId,
        },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getWishlist,
  addToWishlist,
  removeElementWishlist,
  destroyWishlist,
  updateWishlist,
};
