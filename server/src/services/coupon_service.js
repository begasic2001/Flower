import db from "../models/index";
import { v4 as genarateId } from "uuid";

const coupon = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const coupon = await db.sequelize.query(`EXEC sp_ListCoupon`);
      resolve(coupon[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const couponById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.sequelize.query(`EXEC sp_CouponById :id`, {
        replacements: {
          id: id,
        },
      });
      resolve(category[0][0]);
    } catch (error) {
      reject(error);
    }
  });
};

const createCoupon = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_storeCoupon :id , :coupon , :discount`,
        {
          replacements: {
            id: genarateId(),
            coupon: data.coupon,
            discount: data.discount,
          },
        }
      );
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
      const response = await db.sequelize.query(
        `EXEC sp_udpateCoupon :id , :coupon , :discount`,
        {
          replacements: {
            id: cpid,
            coupon: data.coupon,
            discount: data.discount,
          },
        }
      );
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
      const response = await db.sequelize.query(
        `EXEC sp_deleteCoupon :id `,
        {
          replacements: {
            id: cpid
          },
        }
      );

      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  coupon,
  couponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
