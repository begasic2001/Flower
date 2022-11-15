import db from "../models/index";
import { v4 as genarateId } from "uuid";

const coupon = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const coupon = await db.Coupon.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      resolve(coupon);
    } catch (error) {
      reject(error);
    }
  });
};

const couponById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.Coupon.findOne({
        where: {
          id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      resolve(category);
    } catch (error) {
      reject(error);
    }
  });
};

const createCoupon = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Coupon.findOrCreate({
        where: {
          coupon: data.coupon,
        },
        defaults: {
          id: genarateId(),
          coupon: data.coupon,
          discount: data.discount,
        },
      });
      
    
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "Coupon has been created",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateCoupon = ({ cpid, ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Coupon.update(data, {
        where: { id: cpid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} Coupon updated`
            : "Cannot update new coupon/ coupon ID not found",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCoupon = (cpid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Coupon.destroy({
        where: { id: cpid },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports ={
  coupon,
  couponById,
  createCoupon,
  updateCoupon,
  deleteCoupon
}
