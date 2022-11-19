import * as services from "../services/cart_service";
import { brandValidate, bid, filename } from "../config/validatation";
import createError from "http-errors";
import joi from "joi";
const cloudinary = require("cloudinary").v2;
const clientView = async (req, res, next) => {
  try {
    const cart = await cart_service.addToCart()
    res.json(cart)
  } catch (error) {
    next(error);
  }
};

module.exports = {
  clientView,
};
