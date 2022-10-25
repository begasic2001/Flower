import { subcategoriesValidate, subid } from "../config/validatation";
import createError from "http-errors";
import * as services from "../services/subcate_service";
import db from "../models/index";
import joi from "joi";

const subCategoryView = async (req, res, next) => {
  try {
    const subCategory = await services.subCategory();
    console.log({result:subCategory})
    // res.render("admin/subCategory/subCategory", {
    //   subCategory,
    // });
  } catch (error) {
    next(error);
  }
};

const getSubCategoryEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const subCategory = await services.subCategoryById(id);
    res.render("admin/subCategory/edit-subCategory", {
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};

const subCategory = async (req, res, next) => {
  try {
    const subCategory = await db.Subcategories.findAll({});
    res.json({
      status: 1,
      result: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

const subCategoryById = async (req, res, next) => {
  try {
    const subCategory = await db.Subcategories.findAll({});
    res.json({
      status: 1,
      result: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

const storeSubCategory = async (req, res, next) => {
  try {
    const { subcategory_name, categories_id } = req.body;
    const { error } = subcategoriesValidate(req.body);
    if (error) {
      throw createError(error.details[0].message);
    }
    const isExistSubCategories = await db.Subcategories.findOne({
      where: { subcategory_name, categories_id },
    });
    if (isExistSubCategories) {
      throw createError.Conflict(
        `${subcategory_name} or ${categories_id}is has already`,
      );
    }
    const saveCreateSubCategory = await db.Subcategories.create({
      subcategory_name,
      categories_id,
    });
    res.json({
      status: "Create Success",
      element: saveCreateSubCategory,
    });
  } catch (error) {
    next(error);
  }
};
const updateSubCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { categories_id, subcategory_name } = req.body;
    const { error } = subcategoriesValidate(req.body);
    if (error) {
      throw createError(error.details[0].message);
    }
    const isExistUpdateSubCate = await db.Subcategories.findOne({
      where: {
        id,
        categories_id,
        subcategory_name,
      },
    });
    if (isExistUpdateSubCate) {
      throw createError.Conflict(
        `${subcategory_name} or ${categories_id} is has already `,
      );
    }
    await db.Subcategories.update(
      {
        categories_id,
        subcategory_name,
      },
      {
        where: { id: id },
      },
    );
    res.json({
      message: "Update Success",
    });
  } catch (error) {
    next(error);
  }
};
const deleteSubCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    await db.Subcategories.destroy({ where: { id } });
    res.json({
      message: "Delete Success",
    });
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
