import db from "../models/index";
import { v4 as genarateId } from "uuid";

const subCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const subcategory = await db.sequelize.query(`EXEC sp_listSubCategories`);
      resolve(subcategory[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const subCategoryById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const subcategory = await db.sequelize.query(
        `EXEC sp_SubCategoriesById :id`,
        { replacements: { id: id } }
      );
      resolve(subcategory[0][0]);
    } catch (error) {
      reject(error);
    }
  });
};

const createSubCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_AddSubCategory :id , :cat_id , :name`,
        {
          replacements: {
            id: genarateId(),
            cat_id: data.categories_id,
            name: data.subcategory_name,
          },
        }
      );
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "SubCategory has been created",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateSubCategory = ({ subid, ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_EditSubCategory :id , :cat_id , :name`,
        {
          replacements: {
            id: subid,
            cat_id: data.categories_id,
            name: data.subcategory_name,
          },
        }
      );
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} SubCategory updated`
            : "Cannot update new Subcategory/ Subcategory ID not found",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteSubCategory = (subid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(`EXEC sp_DelSubCategory :id`, {
        replacements: {
          id: subid,
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
  subCategory,
  subCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
