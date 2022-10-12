import { categoriesValidate } from "../config/validatation";
import createError from "http-errors";
import db from "../models/index";
const dashboard = (req, res) => {
  res.render("admin/dashboard");
};
const category = async (req, res) => {
  try {
    const category = await db.Categories.findAll({});
    res.render("admin/category/category", {
      category,
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
      cat_name,
    });
    res.redirect("/api/admin/category");
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const cat_nameID = req.params.id;
    await db.Categories.destroy({ where: { id: cat_nameID } });
    res.redirect("/api/admin/category");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  storeCategory,
  dashboard,
  category,
  deleteCategory,
};
