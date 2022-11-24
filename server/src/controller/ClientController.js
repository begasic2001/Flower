import * as services from "../services/product_service";
import * as services1 from "../services/category_service";
import * as services2 from "../services/subcate_service";
import { brandValidate, bid, filename } from "../config/validatation";
import createError from "http-errors";
import joi from "joi";
const cloudinary = require("cloudinary").v2;
const clientView = async (req, res, next) => {
  try {
    const getByStatus = await services.getAny({
      status: 1,
      order: ["id", "DESC"],
    });
    let productByStatus = getByStatus.productData.rows;
    const category = await services1.category();
    const subCategory = await services2.subCategory();
    const numberFormat = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    res.render("client/index", {
      category,
      subCategory,
      productByStatus,
      numberFormat,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  clientView,
};
