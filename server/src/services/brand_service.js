import { categoriesValidate } from "../config/validatation";
import createError from "http-errors";
import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;

const getAny = ({ page, limit, order, name, available, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT_BRAND;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      if (order) queries.order = [order];
      if (name) query.title = { [Op.substring]: name };
      if (available) query.available = { [Op.between]: available };
      const response = await db.Brand.findAndCountAll({
        where: query,
        ...queries,
        attributes: {
          exclude: ["category_code", "description"],
        },
        include: [
          {
            model: db.Category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            as: "categoryData",
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "Cannot found category",
        bookData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

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
          filename: fileData?.filename
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

const updateBrand = ({ id, ...data }, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (fileData) data.image = fileData?.path;
      const response = await db.Brand.update(data, {
        where: { id },
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

const deleteBrand = (id, filename) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Brand.destroy({
        where: { id },
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
  createBrand,
  updateBrand,
  deleteBrand,
  getAny,
};
