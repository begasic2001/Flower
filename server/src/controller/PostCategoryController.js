import {
  postCategoriesValidate,
  postBlogValidate,
  pcid,
  lpid,
} from "../config/validatation";
import * as services from "../services/post_categories_service";
import createError from "http-errors";
import joi from "joi";
const cloudinary = require("cloudinary").v2;
const postCategoryView = async (req, res, next) => {
  try {
    const category = await services.postCategory();
    res.render("admin/blogcate/category", {
      category,
    });
  } catch (error) {
    next(error);
  }
};
const getPostCategoryEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await services.postCategoryById(id);
    res.render("admin/blogcate/edit-postcategory", {
      category,
    });
  } catch (error) {
    next(error);
  }
};

const storeBlogCategory = async (req, res, next) => {
  try {
    const category = await services.postCategory();
    const { error } = postCategoriesValidate(req.body);
    if (error) {
      res.render("admin/blogcate/category", {
        category,
        error,
      });
    } else {
      const newPostCategory = await services.createPostCategory(req.body);
      if (newPostCategory) res.redirect("/api/blog/category");
    }
  } catch (error) {
    next(error);
  }
};
const updateBlogCategory = async (req, res, next) => {
  try {
    const { error } = joi.object({ pcid }).validate({ pcid: req.body.pcid });
    if (error) {
      throw createError(error.details[0].message);
    } else {
      const response = await services.updatePostCategory(req.body);
      if (response) res.redirect("/api/blog/category");
    }
  } catch (error) {
    next(error);
  }
};

const deleteBlogCategory = async (req, res, next) => {
  try {
    const { error } = joi.object({ pcid }).validate(req.query);
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await services.deletePostCategory(req.query.pcid);
    if (response) res.redirect("/api/blog/category");
  } catch (error) {
    next(error);
  }
};

const blogPost = async (req, res, next) => {
  try {
    const category = await services.postCategory();
    res.render("admin/blogcate/add-blog", {
      category,
    });
  } catch (error) {
    next(error);
  }
};

const listBlog = async (req, res, next) => {
  try {
    const listBlog = await services.listBlog();
    const category = await services.postCategory(); 
    res.render("admin/blogcate/blog", {
      listBlog,
      category,
    });
  } catch (error) {
    next(error);
  }
};
const getListPostEdit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const listBlog = await services.listBlogById(id);
    const category = await services.postCategory();
    res.render("admin/blogcate/edit-listblog", {
      listBlog,
      category,
    });
  } catch (error) {
    next(error);
  }
};

const storeBlogPost = async (req, res, next) => {
  try {
    const fileData = req.file;
    const { error } = await postBlogValidate({
      ...req.body,
      post_image: fileData?.path,
    });
    if (error) {
      const category = await services.postCategory();
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      res.render("admin/blogcate/add-blog", { error, category });
    } else {
      const newBlogPost = await services.createPostBlog(req.body, fileData);
      if (newBlogPost) res.redirect("/api/blog/blogPost");
    }
  } catch (error) {
    next(error);
  }
};

const updateListBlogCategory = async (req, res, next) => {
  try {
      const fileData = req.file;
      const { error } = joi.object({ lpid }).validate({ lpid: req.body.lpid });
      if (error) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        throw createError(error.details[0].message);
      } else {
        const response = await services.updateListPostCategory(
          req.body,
          fileData
        );
        if (response) res.redirect("/api/blog/listBlog");
      }
  } catch (error) {
    next(error);
  }
};

const deleteListBlog = async (req, res, next) => {
  try {
    const { error } = joi.object({ lpid }).validate({ lpid: req.query.lpid });
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await services.deleteListBlog(
      req.query.lpid,
      req.query.filename
    );
    if (response) res.redirect("/api/blog/listBlog");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getPostCategoryEdit,
  postCategoryView,
  storeBlogCategory,
  updateBlogCategory,
  updateListBlogCategory,
  deleteBlogCategory,
  blogPost,
  storeBlogPost,
  listBlog,
  getListPostEdit,
  deleteListBlog,
};
