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

module.exports = {
  newslaters,
};
