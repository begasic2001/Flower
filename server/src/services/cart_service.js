import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;

const addToCart = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.sequelize.query(`EXEC sp_listBrand`);
      resolve(brand[0]);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  addToCart,
};
