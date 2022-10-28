import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;



const brand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.Brand.findAll({});
      resolve(brand);
    } catch (error) {
      reject(error);
    }
  });
};

const brandById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.Brand.findOne({
        where: {
          id,
        },
      });
      resolve(brand);
    } catch (error) {
      reject(error);
    }
  });
};

const createBrand = (data, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Brand.findOrCreate({
        where: {
          brand_name: data.brand_name,
        },
        defaults: {
          id: genarateId(),
          brand_name: data.brand_name,
          brand_logo: fileData?.path,
          filename: fileData?.filename,
        },
      });
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "Brand has been created",
      });
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
};

const updateBrand = ({ bid, ...data }, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (fileData) {
        cloudinary.uploader.destroy(data.filename);
        data.brand_logo = fileData?.path;
        data.filename = fileData?.filename;
      }
      const response = await db.Brand.update(data, {
        where: { id: bid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} brand updated`
            : "Cannot update new brand/ brand ID not found",
      });
      if (fileData && response[0] === 0)
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
};

const deleteBrand = (bid, filename) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Brand.destroy({
        where: { id: bid },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
      cloudinary.uploader.destroy(filename);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  brand,
  brandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
