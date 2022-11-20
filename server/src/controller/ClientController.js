import * as services from "../services/product_service";
import * as services1 from "../services/category_service";
import * as services2 from "../services/subcate_service";
import { brandValidate, bid, filename } from "../config/validatation";
import createError from "http-errors";
import joi from "joi";
const cloudinary = require("cloudinary").v2;
const clientView = async (req, res, next) => {
  try {
    const category = await services1.category();
    const subCategory = await services2.subCategory();
    res.render("client/index", {
      category,
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  clientView,
};
