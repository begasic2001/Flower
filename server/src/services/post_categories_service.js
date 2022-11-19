import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;
const postCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.sequelize.query(`EXEC sp_listPost`);
      resolve(category[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const postCategoryById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.sequelize.query(`EXEC sp_listPostById :id`, {
        replacements: { id: id },
      });
      resolve(category[0][0]);
    } catch (error) {
      reject(error);
    }
  });
};

const createPostCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_createPost :id , :cat_name_en , :cat_name_vn`,
        {
          replacements: {
            id: genarateId(),
            cat_name_en: data.cat_name_en,
            cat_name_vn: data.cat_name_vn,
          },
        }
      );
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
      const response = await db.sequelize.query(
        `EXEC sp_updatePost :id , :cat_name_en , :cat_name_vn`,
        {
          replacements: {
            id: pcid,
            cat_name_en: data.cat_name_en,
            cat_name_vn: data.cat_name_vn,
          },
        }
      );
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

const updateListPostCategory = ({ lpid, ...data }, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (fileData) {
        console.log(data)
        console.log(fileData)
        cloudinary.uploader.destroy(data.filename);
        data.post_image = fileData?.path;
        data.filename = fileData?.filename;
        const response = await db.sequelize.query(
          `EXEC sp_updatePostBlog  :id ,
            :categories_id ,
            :post_en ,
            :post_vn ,
            :details_en ,
            :details_vn ,
            :post_image ,
            :filename  `,
          {
            replacements: {
              id: lpid,
              categories_id: data.categories_id,
              post_en: data.post_en,
              post_vn: data.post_vn,
              details_en: data.details_en,
              details_vn: data.details_vn,
              post_image: data.post_image,
              filename: data.filename,
            },
          }
        );
        resolve({
          err: response[0] > 0 ? 0 : 1,
          mes:
            response[0] > 0
              ? `${response[0]} Post updated`
              : "Cannot update new Post/ Post ID not found",
        });
      } else {
        const response = await db.sequelize.query(
          `EXEC sp_updatePostBlogNoImage  :id ,
            :categories_id ,
            :post_en ,
            :post_vn ,
            :details_en ,
            :details_vn
           `,
          {
            replacements: {
              id: lpid,
              categories_id: data.categories_id,
              post_en: data.post_en,
              post_vn: data.post_vn,
              details_en: data.details_en,
              details_vn: data.details_vn,
            },
          }
        );
        resolve({
          err: response[0] > 0 ? 0 : 1,
          mes:
            response[0] > 0
              ? `${response[0]} Post updated`
              : "Cannot update new Post/ Post ID not found",
        });
      }

      if (fileData && response[0] === 0)
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
};
const deletePostCategory = (pcid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(`EXEC sp_deletePost :id`, {
        replacements: {
          id: pcid,
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

const createPostBlog = (data, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_createPostBlog  :id ,
            :categories_id ,
            :post_en ,
            :post_vn ,
            :details_en ,
            :details_vn ,
            :post_image ,
            :filename  `,
        {
          replacements: {
            id: genarateId(),
            post_en: data.post_en,
            post_vn: data.post_vn,
            post_image: fileData?.path,
            filename: fileData?.filename,
            details_en: data.details_en,
            details_vn: data.details_vn,
            categories_id: data.categories_id,
          },
        }
      );
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
      const response = await db.sequelize.query(`EXEC sp_listPostBlog`);
      resolve(response[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const listBlogById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_listPostBlogById :id`,
        {
          replacements: { id: id },
        }
      );
      resolve(response[0][0]);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteListBlog = (lpid, filename) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(`EXEC sp_deletePostBlog :id`, {
        replacements: { id: lpid },
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
