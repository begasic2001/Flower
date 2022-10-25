import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;

const subCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const subcategory = await db.Subcategories.findAll({
        nest: true,
        raw: true,
        include: {
          model: db.Categories,
        },
      });

      resolve(subcategory);
    } catch (error) {
      reject(error);
    }
  });
};

const subCategoryById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const subcategory = await db.Subcategories.findOne({
        where: {
          id,
        },
      });
      resolve(subcategory);
    } catch (error) {
      reject(error);
    }
  });
};

const createSubCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Subcategories.findOrCreate({
        where: {
          subcategory_name: data.subcategory_name,
        },
        defaults: {
          id: genarateId(),
          categories_id: data.categories_id,
          subcategory_name: data.subcategory_name,
        },
      });
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "SubCategory has been created",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateSubCategory = ({ subid, ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Subcategories.update(data, {
        where: { id: subid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} SubCategory updated`
            : "Cannot update new Subcategory/ categories ID not found",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteSubCategory = (subid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Subcategories.destroy({
        where: { id: subid },
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
  subCategory,
  subCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
