// import { subcategoriesValidate, subid } from "../config/validatation";
import createError from "http-errors";
import * as services from "../services/category_service";
import * as services2 from "../services/brand_service";
import * as services_product from "../services/product_service";
import joi from "joi";

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
    res.render("admin/product/product");
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
    res.json(req.body);
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
