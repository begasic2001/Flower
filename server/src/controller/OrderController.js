import * as services from "../services/order_service";
import createError from "http-errors";
import joi from "joi";

const orderView = async (req, res, next) => {
  try {
    const order = await services.order();
    res.render("admin/order/order", {
      order,
    });
  } catch (error) {
    next(error);
  }
};
const orderDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderDetail = await services.orderDetail(id);
    res.render("admin/order/orderdetail", {
      orderDetail,
    });
  } catch (error) {
    next(error);
  }
};
const shippingView = async (req, res, next) => {
  try {
    const shipping = await services.shipping();
    res.render("admin/order/shipping", {
      shipping,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  orderView,
  orderDetail,
  shippingView,
};
