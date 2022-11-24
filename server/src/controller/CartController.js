import * as services from "../services/cart_service";
import { brandValidate, bid, filename } from "../config/validatation";
import createError from "http-errors";
import joi from "joi";
const cloudinary = require("cloudinary").v2;
const getCart = async (req, res, next) => {
  try {
    const userId = req.payLoad.userId;
    const cart = await services.getCart(userId);
    console.log(cart);
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const userId = req.payLoad.userId;
    const cart = await services.addToCart(userId, productId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const removeElementCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const userId = req.payLoad.userId;
    const cart = await services.removeElementCart(userId, productId);
    console.log(cart);
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const userId = req.payLoad.userId;
    const amount = +req.body.amount;
    const cart = await services.updateCart(userId, productId, amount);
    console.log(cart);
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const userId = req.payLoad.userId;
    const cart = await services.destroyCart(userId);
    console.log(cart);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getCart,
  addToCart,
  removeElementCart,
  updateCart,
  deleteCart,
};
