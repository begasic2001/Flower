import db from "../models/index";
import { v4 as genarateId } from "uuid";

const user = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
const userById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = ({ uid, ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(data, {
        where: { id: uid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} User updated`
            : "Cannot update new user/ user ID not found",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.destroy({
        where: { id: uid },
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

module.exports = {
  user,
  userById,
  updateUser,
  deleteUser,
};
