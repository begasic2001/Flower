import coupon_service from "../services/coupon_service";
import * as newslaters_service from "../services/newslaters_service";
import createError from "http-errors";
import { couponValidate, cpid } from "../config/validatation";
import joi from "joi";
const moment = require("moment");
const CouponView = async (req, res, next) => {
  try {
    const coupon = await coupon_service.coupon();
    res.render("admin/coupon/coupon", {
      coupon,
    });
  } catch (error) {
    next(error);
  }
};
const coupon = async (req, res, next) => {
  try {
    const coupon = await coupon_service.coupon();
    res.json({
      result: coupon,
    });
  } catch (error) {
    next(error);
  }
};
const getCouponEdit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const coupon = await coupon_service.couponById(id);
    res.render("admin/coupon/edit-coupon", {
      coupon,
    });
  } catch (error) {
    next(error);
  }
};
const couponById = async (req, res, next) => {};
const storeCoupon = async (req, res, next) => {
  try {
    const { error } = couponValidate(req.body);
    if (error) {
      throw createError(error.details[0].message);
    }
    const newCoupon = await coupon_service.createCoupon(req.body);
    if (newCoupon) res.redirect("coupon");
  } catch (error) {
    next(error);
  }
};
const updateCoupon = async (req, res, next) => {
  try {
    const { error } = joi.object({ cpid }).validate({ cpid: req.body.cpid });
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await coupon_service.updateCoupon(req.body);
    if (response) res.redirect("/api/coup/coupon");
  } catch (error) {
    next(error);
  }
};
const deleteCoupon = async (req, res, next) => {
  try {
    const { error } = joi.object({ cpid }).validate({ cpid: req.query.cpid });
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await coupon_service.deleteCoupon(req.query.cpid);
    if (response) res.redirect("/api/coup/coupon");
  } catch (error) {
    next(error);
  }
};

const newslaters = async (req, res, next) => {
  try {
    const newslater = await newslaters_service.newslaters();
    const createdAt = moment(newslater[0].createdAt,'YYYY-MM-DD').fromNow();
    res.render("admin/newslater/newslater", {
      newslater,
      createdAt,
    });
  } catch (error) {
    next(error);
  }
};

const getNewslatersEdit = async (req, res, next) => {
  try {
  } catch (error) {}
};

const storeNewslater = async (req, res, next) => {
  try {
  } catch (error) {}
};

const updateNewslater = async (req, res, next) => {
  try {
  } catch (error) {}
};

const deleteNewslater = async (req, res, next) => {
  try {
  } catch (error) {}
};
module.exports = {
  coupon,
  CouponView,
  getCouponEdit,
  couponById,
  storeCoupon,
  updateCoupon,
  deleteCoupon,
  newslaters,
  getNewslatersEdit,
  storeNewslater,
  updateNewslater,
  deleteNewslater,
};
