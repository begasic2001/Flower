import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;
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
            ? `${response[0]} PostCategories updated`
            : "Cannot update new Postcategories/ Postcategories ID not found",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateListPostCategory = ({ lpid, ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.update(data, {
        where: { id: lpid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} Post updated`
            : "Cannot update new Post/ Post ID not found",
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

const createPostBlog = (data, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findOrCreate({
        where: {
          post_en: data.post_en,
          post_vn: data.post_vn,
        },
        defaults: {
          id: genarateId(),
          post_en: data.post_en,
          post_vn: data.post_vn,
          post_image: fileData?.path,
          filename: fileData?.filename,
          details_en: data.details_en,
          details_vn: data.details_vn,
          categories_id: data.categories_id,
        },
      });
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "Posts has been created",
      });
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
};

const listBlog = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        include: [
          {
            model: db.post_categories,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["categories_id", "createdAt", "updatedAt"] },
        raw: true,
        nest: true,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const listBlogById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findOne({
        where: {
          id,
        },
        include: [
          {
            model: db.post_categories,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["categories_id", "createdAt", "updatedAt"] },
        raw: true,
        nest: true,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteListBlog = (lpid, filename) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id: lpid },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
      cloudinary.uploader.destroy(filename);
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
  updateListPostCategory,
  deletePostCategory,
  deleteListBlog,
  createPostBlog,
  listBlog,
  listBlogById,
};
