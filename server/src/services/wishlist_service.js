import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;
const getWishlist = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Wishlist = await db.sequelize.query(`EXEC sp_getWishList :CUS `, {
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
      const Wishlist = await db.sequelize.query(
        `EXEC sp_AddToWishList :id ,:CUS , :ITEM `,
        {
          replacements: {
            id: genarateId(),
            CUS: userId,
            ITEM: productId,
          },
        })

        
      resolve(Wishlist[0]);
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


const destroyWishlist = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_destroyWishlist :CUS  `,
        {
          replacements: {
            CUS: userId,
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
module.exports = {
  getWishlist,
  addToWishlist,
  removeElementWishlist,
  destroyWishlist,
};
