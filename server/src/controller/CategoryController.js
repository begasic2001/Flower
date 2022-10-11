import { categoriesValidate } from "../config/validatation";
import createError from "http-errors";
import db from "../models/index";
const category = async(req, res, next) => {
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
const categoryById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const category = await db.Categories.findOne({ where: { id } });
        if (!category) {
            throw createError.NotFound()
        }
        res.json({
            status: 1,
            result: category,
        });
    } catch (error) {
        next(error);
    }
};
const storeCategory = async(req, res, next) => {
    try {
        const {
            cat_name
        } = req.body;
        const {
            error
        } = categoriesValidate(req.body);

        if (error) {
            throw createError(error.details[0].message);
        }
        const isExistCatName = await db.Categories.findOne({ where: { cat_name } });
        if (isExistCatName) {
            throw createError.Conflict(`${cat_name} is has already `);
        }
        const saveCreateCategory = await db.Categories.create({
            cat_name,
        });
        res.json({
            status: 'Create success',
            element: saveCreateCategory,
        })
    } catch (error) {
        next(error);
    }
};
const updateCategory = async(req, res, next) => {
    try {
        const cat_nameID = req.params.id;
        const cat_name = req.body.cat_name;
        const { error } = categoriesValidate(req.body);
        const isExistUpdate = await db.Categories.findOne({
            where: {
                id: cat_nameID,
                cat_name
            }
        });
        if (error) {
            throw createError(error.details[0].message);
        }
        if (isExistUpdate) {
            throw createError.Conflict(`${cat_name} is has already `);
        }
        await db.Categories.update({ cat_name }, { where: { id: cat_nameID } });
        res.json({
            message: 'Update Success',
        })
    } catch (error) {
        next(error);
    }
};
const deleteCategory = async(req, res, next) => {
    try {
        const cat_nameID = req.params.id;
        await db.Categories.destroy({ where: { id: cat_nameID } })
        res.json({
            message: 'Delete Success',
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    category,
    categoryById,
    storeCategory,
    updateCategory,
    deleteCategory,
};