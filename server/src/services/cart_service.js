import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;
const getCart = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await db.sequelize.query(`EXEC sp_getCart :CUS `, {
        replacements: {
          CUS: userId,
        },
      });
      resolve(cart[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const addToCart = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await db.sequelize.query(
        `EXEC sp_AddToCart :CUS , :ITEM , :AMOUNT`,
        {
          replacements: {
            CUS: userId,
            ITEM: productId,
            AMOUNT: 1,
          },
        }
      );
      resolve(cart[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const removeElementCart = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_removeElementCart :CUS , :ITEM `,
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

const destroyCart = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_destroyCart :CUS  `,
        {
          replacements: {
            CUS: userId
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
  getCart,
  addToCart,
  removeElementCart,
  destroyCart,
};
