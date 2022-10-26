import { subcategoriesValidate, subid } from "../config/validatation";
import createError from "http-errors";
import * as services from "../services/subcate_service";
import * as services2 from "../services/category_service";
import joi from "joi";

const subCategoryView = async (req, res, next) => {
  try {
    const subCategory = await services.subCategory();
    const category = await services2.category();

    res.render("admin/subcategory/subcategory", {
      subCategory,
      category,
    });
  } catch (error) {
    next(error);
  }
};

const getSubCategoryEdit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const subCategory = await services.subCategoryById(id);
    const category = await services2.category();
    res.render("admin/subcategory/edit-subcategory", {
      subCategory,
      category,
    });
  } catch (error) {
    next(error);
  }
};

const subCategory = async (req, res, next) => {
  try {
    const subCategory = await services.subCategory();
    res.json({
      result: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

const subCategoryById = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const storeSubCategory = async (req, res, next) => {
  try {
    const { error } = subcategoriesValidate(req.body);
    if (error) {
      throw createError(error.details[0].message);
    }
    const newSubCategory = await services.createSubCategory(req.body);
    if (newSubCategory) res.redirect("/api/subcate/subCategory");
  } catch (error) {
    next(error);
  }
};
const updateSubCategory = async (req, res, next) => {
  try {
    console.log(req.body)
    const { error } = joi.object({ subid }).validate({ subid: req.body.subid });
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await services.updateSubCategory(req.body);
    if (response) res.redirect("/api/subcate/subCategory");
  } catch (error) {
    next(error);
  }
};
const deleteSubCategory = async (req, res, next) => {
  try {
    const { error } = joi
      .object({ subid })
      .validate({ subid: req.query.subid });
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await services.deleteSubCategory(req.query.subid);
    if (response) res.redirect("/api/subcate/subCategory");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  subCategoryView,
  getSubCategoryEdit,
  subCategory,
  subCategoryById,
  storeSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
