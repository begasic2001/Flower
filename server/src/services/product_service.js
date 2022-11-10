import db from "../models/index";
import { Op } from "sequelize";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const getAny = ({ page, limit, order, name, available, price, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT_PRODUCT;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      if (order) queries.order = [order];
      if (name) query.pro_name = { [Op.substring]: name };
      if (available) query.pro_quantity = { [Op.between]: available };
      if (price) {
        price[0] = +price[0];
        price[1] = +price[1];
        query.selling_price = { [Op.between]: price };
      }
      const response = await db.Product.findAndCountAll({
        where: query,
        ...queries,
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
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "Cannot found product",
        productData: response,
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
const productById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findOne({
        where: {
          id,
        },
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

const updateProduct = (
  { pid, ...data },
  fieldname1,
  fieldname2,
  fieldname3,
  filenames
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (fieldname1) {
        if (fieldname1.filename1) {
          cloudinary.uploader.destroy(data?.filename_one);
          data.img_one = fieldname1?.urls1[0] ? fieldname1?.urls1[0] : "";
          data.filename_one = fieldname1?.filename1[0]
            ? fieldname1?.filename1[0]
            : "";
        }
      }

      if (fieldname2) {
        if (fieldname2.filename2) {
          cloudinary.uploader.destroy(data?.filename_two);
          data.img_two = fieldname2?.urls2[0] ? fieldname2?.urls2[0] : "";
          data.filename_two = fieldname2?.filename2[0]
            ? fieldname2?.filename2[0]
            : "";
        }
      }
      if (fieldname3) {
        if (fieldname3.filename3) {
          cloudinary.uploader.destroy(data?.filename_three);
          data.img_three = fieldname3?.urls3[0] ? fieldname3?.urls3[0] : "";
          data.filename_three = fieldname3?.filename3[0]
            ? fieldname3?.filename3[0]
            : "";
        }
      }
      data.main_slider = data.main_slider === "1" ? "1" : "0";
      data.best_rated = data.best_rated === "1" ? "1" : "0";
      data.hot_new = data.hot_new === "1" ? "1" : "0";
      data.trend = data.trend === "1" ? "1" : "0";
      data.buyone_getone = data.buyone_getone === "1" ? "1" : "0";
      const response = await db.Product.update(data, {
        where: { id: pid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} Product updated`
            : "Cannot update new product/ product ID not found",
      });
      if (filenames && response[0] === 0)
        cloudinary.api.delete_resources(filenames);
    } catch (error) {
      reject(error);
      if (filenames) cloudinary.api.delete_resources(filenames);
    }
  });
};

const deleteProduct = async (pid, filenames) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.destroy({
        where: { id: pid },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
      cloudinary.api.delete_resources(filenames);
    } catch (error) {
      reject(error);
    }
  });
};

const activeProduct = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.update(
        { status: "1" },
        {
          where: {
            id,
          },
        }
      );
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} updated`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const inactiveProduct = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.update(
        { status: "0" },
        {
          where: {
            id,
          },
        }
      );
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} updated`,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getSubCate,
  getAny,
  productById,
  product,
  storeProduct,
  updateProduct,
  deleteProduct,
  activeProduct,
  inactiveProduct,
};
