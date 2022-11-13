import db from "../models/index";
import { v4 as genarateId } from "uuid";

const category = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.sequelize.query(`EXEC sp_listCategories`, {
        raw: true,
      });
      resolve(category[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const categoryById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.sequelize.query(`EXEC sp_CategoriesById :id`,{
        replacements:{id:id},
        raw: true,
      });
      resolve(category[0][0]);
    } catch (error) {
      reject(error);
    }
  });
};

const createCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_AddCategory :id , :name`,
        {
          replacements: { id: genarateId(), name: data.cat_name },
        }
      );
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "Category has been created",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateCategory = ({ cid, ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_EditCategory :id , :name`,
        { replacements: { id: cid, name: data.cat_name } }
      );
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

const deleteCategory = (cid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(`EXEC sp_DelCategory :id`, {
        replacements: { id: cid },
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
  category,
  categoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
