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

const product = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findAll({
        include: [
          {
            model: db.Categories,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: db.Subcategories,
            attributes: {
              exclude: ["createdAt", "updatedAt", "categories_id"],
            },
          },
          {
            model: db.Brand,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],

        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "categories_id",
            "subcat_id",
            "brand_id",
          ],
        },
        raw: true,
        nest: true,
      });
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
};

const storeProduct = async (data, urls, filenames) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findOrCreate({
        where: {
          pro_name: data.pro_name,
        },
        defaults: {
          id: genarateId(),
          ...data,
          status: "1",
          img_one: urls[0],
          img_two: urls[1],
          img_three: urls[2],
          filename_one: filenames[0],
          filename_two: filenames[1],
          filename_three: filenames[2],
        },
      });
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "Product has been created",
      });
      if (urls && filenames && !response[1])
        cloudinary.api.delete_resources(filenames);
    } catch (error) {
      reject(error);
      cloudinary.api.delete_resources(filenames);
    }
  });
};

const updateProduct = ({ pid, ...data }, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (fileData) {
        cloudinary.uploader.destroy(data.filename);
        data.brand_logo = fileData?.path;
        data.filename = fileData?.filename;
      }
      const response = await db.Brand.update(data, {
        where: { id: pid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} Product updated`
            : "Cannot update new product/ product ID not found",
      });
      if (fileData && response[0] === 0)
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
};

const deleteProduct = (bid, filename) => {
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
  getSubCate,
  getAny,
  product,
  storeProduct,
};
