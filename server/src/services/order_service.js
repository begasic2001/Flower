import db from "../models/index";
const order = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findAll({
        include: {
          model: db.User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        raw: true,
        nest: true,
      });
      resolve(order);
    } catch (error) {
      reject(error);
    }
  });
};
const orderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderDetail = await db.Order_details.findAll({
        where: {
          id,
        },
        include: [
          {
            model: db.Product,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: db.Order,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt", "product_id"] },
        raw: true,
        nest: true,
      });
      resolve(orderDetail);
    } catch (error) {
      reject(error);
    }
  });
};
const shipping = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const shipping = await db.Shipping.findAll({
        include: {
          model: db.Order,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        attributes: { exclude: ["createdAt", "updatedAt", "order_id"] },
        raw: true,
        nest: true,
      });
      resolve(shipping);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  order,
  orderDetail,
  shipping,
};
