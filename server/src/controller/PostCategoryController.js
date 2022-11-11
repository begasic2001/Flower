import { postCategoriesValidate, pcid } from "../config/validatation";
import * as services from "../services/post_categories_service";
import createError from "http-errors";
import joi from "joi";

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
    console.log(req.body)
    // const { error } = joi.object({ pcid }).validate({ pcid: req.body.pcid });
    // if (error) {
    //   throw createError(error.details[0].message);
    // }
    // const response = await services.updatePostCategory(req.body);
    // if (response) res.redirect("/api/blog/category");
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
    if (response) res.redirect("/api/cate/category");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostCategoryEdit,
  postCategoryView,
  storeBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
