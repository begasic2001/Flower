// import { subcategoriesValidate, subid } from "../config/validatation";
import createError from "http-errors";
import * as services from "../services/category_service";
import * as services2 from "../services/brand_service";
import * as services3 from "../services/subcate_service";
import * as services_product from "../services/product_service";
const cloudinary = require("cloudinary").v2;
import { productValidate, pid } from "../config/validatation";
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
    const product = await services_product.product();
    res.render("admin/product/product", {
      product,
    });
  } catch (error) {
    next(error);
  }
};

const getproductDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await services_product.productById(id);
    res.render("admin/product/detail-product", {
      product,
    });
  } catch (error) {
    next(error);
  }
};
const getProductEdit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await services_product.productById(id);
    const category = await services.category();
    const brand = await services2.brand();
    const subcategory = await services3.subCategory();

    res.render("admin/product/edit-product", {
      product,
      category,
      brand,
      subcategory,
    });
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

const activeProduct = async (req, res, next) => {
  try {
    
    const id = req.params.id;
    const status = "1";
    const response = await services_product.activeProduct(status,id);
    res.json(response)
  } catch (error) {
    next(error);
  }
};

const inactiveProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = "0";
    const response = await services_product.inactiveProduct(status,id);
    res.json(response)
  } catch (error) {
    next(error);
  }
};

const storeProduct = async (req, res, next) => {
  try {
    let urls = [];
    let filenames = [];
    const files = req.files;
    if (files) {
      for (const file of files) {
        const { path, filename } = file;
        filenames.push(filename);
        urls.push(path);
      }
    }
    const { error } = productValidate({
      ...req.body,
    });
    if (error) {
      if (files) cloudinary.api.delete_resources(filenames);
      throw createError(error.details[0].message);
    }

    const response = await services_product.storeProduct(
      req.body,
      urls,
      filenames,
    );

    if (response) res.redirect("/api/product/addProduct");
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const files = req.files;
    const filenames = [];
    let filename1 = [];
    let urls1 = [];
    let filename2 = [];
    let urls2 = [];
    let filename3 = [];
    let urls3 = [];
    let fieldname3 = {};
    let fieldname2 = {};
    let fieldname1 = {};
    if (files.image1) {
      for (const file of files.image1) {
        const { path, filename } = file;

        filename1.push(filename);
        filenames.push(filename);
        urls1.push(path);
      }
      fieldname1 = {
        filename1,
        urls1,
      };
    }
    if (files.image2) {
      for (const file of files.image2) {
        const { path, filename } = file;
        filename2.push(filename);
        filenames.push(filename);

        urls2.push(path);
        fieldname2 = {
          filename2,
          urls2,
        };
      }
    }
    if (files.image3) {
      for (const file of files.image3) {
        const { path, filename } = file;
        filename3.push(filename);
        filenames.push(filename);
        urls3.push(path);
        fieldname3 = {
          filename3,
          urls3,
        };
      }
    }
    const { error } = joi.object({ pid }).validate({ pid: req.body.pid });
    if (error) {
      if (files) cloudinary.api.delete_resources(filenames);
      throw createError(error.details[0].message);
    }
    const response = await services_product.updateProduct(
      req.body,
      fieldname1,
      fieldname2,
      fieldname3,
      filenames,
    );

    if (response) res.redirect("/api/product/product");
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { pid, ...data } = req.query;
    let filenames = [];
    for (const filename in data) {
      if (data[filename]) {
        filenames.push(data[filename]);
      }
    }
    const { error } = joi.object({ pid }).validate({ pid });
    if (error) {
      throw createError(error.details[0].message);
    }

    const response = await services_product.deleteProduct(
      req.query.pid,
      filenames,
    );

    if (response) res.redirect("/api/product/product");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAddProduct,
  getproductDetail,
  productView,
  getProductEdit,
  getSubCate,
  activeProduct,
  inactiveProduct,
  storeProduct,
  updateProduct,
  deleteProduct,
};
