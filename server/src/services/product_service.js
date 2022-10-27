import db from "../models/index";
import { v4 as genarateId } from "uuid";

const getSubCate = async (categories_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const subCategory = await db.Subcategories.findAll({
        where: {
          categories_id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        raw: true,
      });
      resolve(subCategory);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getSubCate,
};
