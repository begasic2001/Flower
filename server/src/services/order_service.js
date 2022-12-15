import db from "../models/index";
const order = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await db.sequelize.query(`EXEC sp_getAllOrder`);

      resolve(order[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const orderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderDetail = await db.sequelize.query(`EXEC sp_getOrderById :id`, {
        replacements: {
          id: id,
        },
      });
      resolve(orderDetail[0]);
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

const orderUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_getOrderUserById :CUS`,
        {
          replacements: {
            CUS: id,
          },
        }
      );
      resolve(response[0])
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  order,
  orderDetail,
  shipping,
  orderUserId,
};
