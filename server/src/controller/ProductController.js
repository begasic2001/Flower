// import { subcategoriesValidate, subid } from "../config/validatation";
import createError from "http-errors";
import * as services from "../services/category_service";
import * as services2 from "../services/brand_service";
import * as services_product from "../services/product_service";
const cloudinary = require("cloudinary").v2;
import { productValidate } from "../config/validatation";
const getAddProduct = async (req, res, next) => {
  try {
    const category = await services.category();
    const brand = await services2.brand();
    res.render("admin/product/add-product", {
      category,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

const productView = async (req, res, next) => {
  try {
    const product = await services_product.product()
    res.render("admin/product/product",{
      product
    })
  } catch (error) {
    next(error);
  }
};

const getProductEdit = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getSubCate = async (req, res, next) => {
  try {
    const categories_id = req.params.categories_id;
    const response = await services_product.getSubCate(categories_id);
    res.json({ response });
  } catch (error) {
    next(error);
  }
};

const storeProduct = async (req, res, next) => {
  try {
    let urls = [];
    let filenames = [];
    const file = req.files;
    console.log(file)
    // if (files) {
    //   for (const file of files) {
    //     const { path, filename } = file;
    //     filenames.push(filename);
    //     urls.push(path);
    //   }
    // }
    // const { error } = productValidate({
    //   ...req.body,
    // });
    // if (error) {
    //   if (files) cloudinary.api.delete_resources(filenames);
    //   throw createError(error.details[0].message);
    // }

    // const response = await services_product.storeProduct(
    //   req.body,
    //   urls,
    //   filenames
    // );
    
    //if(response) res.redirect("/api/product/addProduct");
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAddProduct,
  productView,
  getProductEdit,
  getSubCate,
  storeProduct,
  updateProduct,
  deleteProduct,
};
