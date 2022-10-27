import express from "express";
import CouponController from "../controller/CouponController";
const route = express.Router();

// Admin Coupon
route.get("/coupon", CouponController.CouponView);
// API
route.get("/couponAPI", CouponController.coupon);
route.post("/storeCoupon", CouponController.storeCoupon);
route.get("/getCouponEdit/:id", CouponController.getCouponEdit);
route.put("/updateCoupon/", CouponController.updateCoupon);
route.delete("/deleteCoupon/", CouponController.deleteCoupon);
route.get("/coupon/:id", CouponController.couponById);
module.exports = route;
