import { categoriesValidate } from "../config/validatation";
import createError from "http-errors";
import db from "../models/index";
import { v4 as genarateId } from "uuid";
const dashboard = (req, res) => {
  res.render("admin/dashboard");
};
const categoryView = async (req, res) => {
  try {
    const category = await db.Categories.findAll({});
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
    const category = await db.Categories.findOne({ where: { id } });
    res.render("admin/category/edit-category", {
      category,
    });
  } catch (error) {
    next(error);
  }
};

const category = async (req, res, next) => {
  try {
    const category = await db.Categories.findAll({});
    res.json({
      status: 1,
      result: category,
    });
  } catch (error) {
    next(error);
  }
};
const categoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await db.Categories.findOne({ where: { id } });
    if (!category) {
      throw createError.NotFound();
    }
    res.json({
      status: 1,
      result: category,
    });
  } catch (error) {
    next(error);
  }
};
const storeCategory = async (req, res, next) => {
  try {
    const { cat_name } = req.body;
    const { error } = categoriesValidate(req.body);

    if (error) {
      throw createError(error.details[0].message);
    }
    const isExistCatName = await db.Categories.findOne({ where: { cat_name } });
    if (isExistCatName) {
      throw createError.Conflict(`${cat_name} is has already `);
    }
    await db.Categories.create({
      id: genarateId(),
      cat_name,
    });
    res.redirect("/api/cate/category");
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const cat_nameID = req.params.id;
    const cat_name = req.body.cat_name;
    const { error } = categoriesValidate(req.body);

    if (error) {
      throw createError(error.details[0].message);
    }

    await db.Categories.update({ cat_name }, { where: { id: cat_nameID } });
    res.redirect("/api/cate/category");
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const cat_nameID = req.params.id;
    await db.Categories.destroy({ where: { id: cat_nameID } });
    res.redirect("/api/cate/category");
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
