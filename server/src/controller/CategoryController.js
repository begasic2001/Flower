import { categoriesValidate, cid } from "../config/validatation";
import * as services from "../services/category_service";
import createError from "http-errors";
import joi from "joi";
const dashboard = (req, res) => {
  res.render("admin/dashboard");
};
const categoryView = async (req, res, next) => {
  try {
    const category = await services.category();
    res.render("admin/category/category", {
      category,
    });
  } catch (error) {
    next(error);
  }
};
const getCategoryEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await services.categoryById(id);
    res.render("admin/category/edit-category", {
      category,
    });
  } catch (error) {
    next(error);
  }
};

const category = async (req, res, next) => {
  try {
    const category = await services.Category();
    res.json({
      result: category,
    });
  } catch (error) {
    next(error);
  }
};
const categoryById = async (req, res, next) => {
  try {
    // const id = req.params.id;
    // const category = await db.Categories.findOne({ where: { id } });
    // if (!category) {
    //   throw createError.NotFound();
    // }
    // res.json({
    //   status: 1,
    //   result: category,
    // });
  } catch (error) {
    next(error);
  }
};
const storeCategory = async (req, res, next) => {
  try {
    const { error } = categoriesValidate(req.body);

    if (error) {
      res.render(createError(error.details[0].message));
    }
    const newCategory = await services.createCategory(req.body);
    if (newCategory) res.redirect("/api/cate/category");
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { error } = joi.object({ cid }).validate({ cid: req.body.cid });
    if (error) {
      res.render(createError(error.details[0].message));
    }
    const response = await services.updateCategory(req.body);
    if (response) res.redirect("/api/cate/category");
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { error } = joi.object({ cid }).validate(req.query);
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await services.deleteCategory(req.query.cid);
    if (response) res.redirect("/api/cate/category");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryView,
  category,
  categoryById,
  getCategoryEdit,
  dashboard,
  storeCategory,
  updateCategory,
  deleteCategory,
};
