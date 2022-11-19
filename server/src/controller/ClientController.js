import * as services from "../services/brand_service";
import { brandValidate, bid, filename } from "../config/validatation";
import createError from "http-errors";
import joi from "joi";
const cloudinary = require("cloudinary").v2;
const clientView = async (req, res, next) => {
  try {
    res.render("client/index");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  clientView,
};
