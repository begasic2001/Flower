import db from "../models/index";
import { v4 as genarateId } from "uuid";

const newslaters = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const newslaters = await db.Newslater.findAll({
        raw: true,
      });
      resolve(newslaters);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteNewslater = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Newslater.destroy({
        where: {
          id,
        },
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
  newslaters,
  deleteNewslater,
};
