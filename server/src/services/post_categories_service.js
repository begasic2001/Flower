import db from "../models/index";
import { v4 as genarateId } from "uuid";

const postCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.post_categories.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      resolve(category);
    } catch (error) {
      reject(error);
    }
  });
};

const postCategoryById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.post_categories.findOne({
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

const createPostCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.post_categories.findOrCreate({
        where: {
          cat_name_en: data.cat_name_en,
          cat_name_vn: data.cat_name_vn,
        },
        defaults: {
          id: genarateId(),
          cat_name_en: data.cat_name_en,
          cat_name_vn: data.cat_name_vn,
        },
      });
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "PostCategory has been created",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updatePostCategory = ({ pcid, ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.post_categories.update(data, {
        where: { id: pcid },
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

const deletePostCategory = (pcid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.post_categories.destroy({
        where: { id: pcid },
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
  postCategory,
  postCategoryById,
  createPostCategory,
  updatePostCategory,
  deletePostCategory,
};
