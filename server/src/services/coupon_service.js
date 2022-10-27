import db from "../models/index";
import { v4 as genarateId } from "uuid";

const coupon = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.Categories.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      resolve(category);
    } catch (error) {
      reject(error);
    }
  });
};

const couponById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.Categories.findOne({
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
      const response = await db.Categories.findOrCreate({
        where: {
          cat_name: data.cat_name,
        },
        defaults: {
          id: genarateId(),
          cat_name: data.cat_name,
        },
      });
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "Category has been created",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateCoupon = ({ cid, ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Categories.update(data, {
        where: { id: cid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} Categories updated`
            : "Cannot update new categories/ categories ID not found",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCoupon = (cid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Categories.destroy({
        where: { id: cid },
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


