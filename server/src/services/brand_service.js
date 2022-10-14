import { categoriesValidate } from "../config/validatation";
import createError from "http-errors";
import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;
const brand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.Brand.findAll({});
      resolve({
        status: 1,
        result: brand,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const createBrand = (data, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Brand.findOrCreate({
        raw: true,
        where: {
          brand_name: data.brand_name,
        },
        defaults: {
          ...data,
          id: genarateId(),
          brand_logo: fileData?.path,
        },
      });
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "Book has been created",
      });
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
};

const updateBrand = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

const deleteBrand = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  brand,
  createBrand,
  updateBrand,
  deleteBrand,
};
